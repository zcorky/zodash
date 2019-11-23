import { Response } from 'node-fetch';
import { Onion, Middleware, Context } from '@zodash/onion';
import { getLogger } from '@zodash/logger';
import LRU from '@zcorky/lru';
import { md5 } from '@zodash/crypto/lib/md5';
import { omit } from '@zodash/omit';

import { request } from '../utils/request';

import {
  ProxyInput, ProxyServerOptions, ProxyServerRequestOptions, HandShakeMethd,
} from '../utils/interface';

import { getUrl } from '../utils/get-url';
import { getHeaders } from '../utils/get-headers';
import { getBody } from '../utils/get-body';

const debug = require('debug')('datahub.server');

declare module '@zodash/onion' {
  export interface Input {
    requestBody: ProxyInput<any>;
    requestServerOptions?: ProxyServerRequestOptions;
  }

  export interface Output {
    response: Response;
  }

  export interface Context {
    state: {
      md5Key: string;
      requestStartTime: number;
      requestTime: number;
    };
  }
}

const DEFAULT_HAND_SHAKE_METHOD = async (...args: any) => {};

export class ProxyServer {
  private app = new Onion();
  private logger = getLogger('datahub.server');;
  private requestCounts = { all: 0, failure: 0 };
  private requestCache = new LRU<string, any>();
  private handShakeMethod: HandShakeMethd = DEFAULT_HAND_SHAKE_METHOD;

  private setupDone = false;

  constructor(public readonly config: ProxyServerOptions = {} as ProxyServerOptions) {}

  public use(middleware: Middleware<Context>) {
    this.app.use(middleware);
    return this;
  }

  private core(): Middleware<Context> {
    return async (ctx, next) => {
      const { target } = this.config!;
      const { requestBody, requestServerOptions } = ctx.input;
      const { method, path, headers: _headers, body: _body } = requestBody;
      const { headers: extendsHeaders } = requestServerOptions! || {};

      const url = getUrl(path, target);
      const headers = getHeaders(_headers, extendsHeaders);
      const body = getBody(_body, method, headers);

      debug('=>', method, url, headers, body);
      
      const response = await request(url, {
        method,
        headers,
        body,
      });

      debug('<=', method, url, response.status, response.headers);

      response.headers.set('X-RunTime', ctx.state.requestTime + '');
      
      ctx.output.response = response;

      await next!();

    };
  }

  public async request<I extends object>(requestBody: ProxyInput<I>, requestServerOptions?: ProxyServerRequestOptions) {
    if (!this.setupDone) {
      this.setup();
    }

    return this.app
      .execute({ requestBody, requestServerOptions } as any)
      .then(({ response }) => response);
  }

  //
  private setup() {
    this.setupDone = true;
    //
    this.use(this.useRequestTime());
    this.use(this.useCountRequest());
    this.use(this.useCache());
    this.use(this.useCatchError());
    //
    this.use(this.useHandShake());
    //
    // this.use(this.useParseJSON());
    //
    this.use(this.useStatusError());
    //
    this.use(this.useChangeRequestHeaders());
    //
    this.use(this.useChangeResponseHeaders());
    // core
    this.use(this.core());
  }

  private useRequestTime(): Middleware<Context> {
    return async (ctx, next) => {
      if (!ctx.state) {
        ctx.state = {} as any;
      }

      ctx.state.requestStartTime = +new Date();

      await next!();

      const { method, path } = ctx.input.requestBody;
      const { status } = ctx.output.response;
      const requestTime = +new Date() - ctx.state.requestStartTime;
      ctx.state.requestTime = requestTime;

      this.logger.log(`${method} ${path} ${status} +${requestTime}`);
    };
  }

  private useCountRequest(): Middleware<Context> {
    const cache = new LRU();
    const key = Symbol('tick');
    return async (ctx, next) => {
      this.requestCounts.all += 1;
      
      if (!cache.get(key)) {
        this.logger.log('Gateway:', this.config.target || 'None', ` Count: ${this.requestCounts.all}/${this.requestCounts.failure}`);
    
        cache.set(key, true, { maxAge: 10000 });
      }

      await next!();
    };
  }
  
  private useCache(): Middleware<Context> {
    return async (ctx, next) => {
      const { enableCache } = this.config;
      const { method, path } = ctx.input.requestBody;
      const { requestStartTime } = ctx.state;

      const md5Key = md5(JSON.stringify(ctx.input.requestBody));

      // 命中缓存
      if (enableCache && (method === 'GET' || method === 'HEAD')) {
        const cachedResponse = this.requestCache.get(md5Key);
  
        if (cachedResponse) {
          const requestTime = +new Date() - requestStartTime;
          ctx.state.requestTime = requestTime;
  
          if (cachedResponse instanceof Error) {
            this.logger.log(`${method} ${path} ${(cachedResponse as any).status} +${requestTime} (hit cache)`);
  
            throw cachedResponse;
          }
  
          this.logger.log(`${method} ${path} ${cachedResponse.status} +${requestTime} (hit cache)`);
          
          ctx.output.response = cachedResponse.clone();
          return ;
        }
      }

      ctx.state.md5Key = md5Key;
      await next!();

      // 成功缓存
      if (enableCache) {
        this.requestCache.set(md5Key, ctx.output.response.clone(), { maxAge: 60 * 1000 });
      }
    };
  }

  private useCatchError(): Middleware<Context> {
    return async (ctx, next) => {
      try {
        await next!();
      } catch (error) {
        const { requestStartTime } = ctx.state;

        const requestTime = +new Date() - requestStartTime;
        ctx.state.requestTime = requestTime;

        error.status = error.status || 500;
        error.message = error.message || `Gateway Error: ${error.message} +${requestTime}`;
        
        const { method, path } = ctx.input.requestBody;
        this.logger.log(`${method} ${path} ${error.status} (Gateway Error)`);
        this.logger.error(error);

        this.requestCounts.failure += 1;

        // 避免缓存击穿
        if (this.config.enableCache) {
          this.requestCache.set(ctx.state.md5Key, error, { maxAge: 10 * 1000 });
        }

        throw error;
      }
    }
  }

  private useStatusError(): Middleware<Context> {
    return async (ctx, next) => {
      await next!();

      const { response } = ctx.output;
      const { status } = response;

      if (status < 200 || status > 299) {
        const error = new Error() as any;
        error.status = status;
        error.message = await response.text();

        throw error;
      }
    };
  }

  private useChangeRequestHeaders(): Middleware<Context> {
    return async (ctx, next) => {
      const originHeaders = ctx.input.requestBody.headers;

      ctx.input.requestBody.headers = omit(originHeaders, [
        'host', 'origin', 'referer', 'accept-encoding',
      ]);

      await next!();
    };
  }

  private useChangeResponseHeaders(): Middleware<Context> {
    return async (ctx, next) => {
      await next!();

      const response = ctx.output.response;
      const requestStartTime = ctx.state.requestStartTime;
      response.headers.set('X-Runtime', `${+new Date() - requestStartTime}`);
      
      // avoiding Zlib.zlibOnError
      response.headers.delete('content-encoding');
    };
  }

  private useHandShake(): Middleware<Context> {
    return async (ctx, next) => {
      const { requestServerOptions } = ctx.input;
      const { handshake } = requestServerOptions! || {};

      // waitingHandleShake
      await this.handShakeMethod(handshake)

      await next!();
    };
  }

  // private useParseJSON(): Middleware<Context> {
  //   return async (ctx, next) => {
  //     await next!();

  //     const { response } = ctx.output;
  //     const { headers } = response;
      
  //     const contentType = headers.get('Content-Type');
  //     const json = isJSON(contentType!);
  //   };
  // }

  // on
  public setHandShakeMethod(handSHakeMethod: HandShakeMethd) {
    this.handShakeMethod = handSHakeMethod;
  }
}