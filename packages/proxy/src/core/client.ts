import { Response } from 'node-fetch';
import { Onion, Middleware, Context } from '@zodash/onion';
import { getLogger } from '@zodash/logger';

import {
  ProxyInput, ProxyClientOptions, ProxyClientRequestOptions,
} from '../utils/interface';
import { request } from '../utils/request';

const debug = require('debug')('datahub.client');

declare module '@zodash/onion' {
  export interface Input {
    requestBody: ProxyInput<any>;
    requestClientOptions?: ProxyClientRequestOptions;
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

export class ProxyClient {
  private app = new Onion();
  private logger = getLogger('datahub.client');
  private setupDone = false;

  constructor(private readonly options: ProxyClientOptions = {} as ProxyClientOptions) {}

  public use(middleware: Middleware<Context>) {
    this.app.use(middleware);
    return this;
  }

  private core(): Middleware<Context> {
    return async (ctx, next) => {
      const { server, endpoint, method, headers: _headers } = this.options;
      const { requestBody, requestClientOptions } = ctx.input;
      const { connectProxyHeaders, dataProxyHeaders, handshake } = requestClientOptions || {};

      const url = `${server}${endpoint}`;
      const headers = {
        ..._headers,
        ...connectProxyHeaders,
        // 
        'Content-Type': 'application/json',
      };

      requestBody.headers = {
        ...requestBody.headers,
        ...dataProxyHeaders,
      };

      const body = JSON.stringify({
        // request body
        method: 'GET',
        ...requestBody,

        // handshake info
        handshake,
      });
      
      debug('=>', method, url, headers, body);

      const response = await request(url, {
        method,
        headers,
        body,
      });

      debug('<=', method, url, response.status, response.headers);
      
      ctx.output.response = response;

      await next!();

    };
  }

  public async request<I extends object>(requestBody: ProxyInput<I>, requestClientOptions?: ProxyClientRequestOptions) {
    if (!this.setupDone) {
      this.setup();
    }

    return this.app
      .execute({ requestBody, requestClientOptions } as any)
      .then(({ response }) => response);
  }

  private setup() {
    this.setupDone = true;

    //
    this.use(this.useRequestTime());
    this.use(this.core());
  }

  //
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
}