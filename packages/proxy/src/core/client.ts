import { Onion, Middleware, Context } from '@zodash/onion';
import { getLogger } from '@zodash/logger';

import {
  ClientRequestBody, ClientProxyRequest,
  ResponseBody,
  ProxyClientConfig, ProxyClientRequestOptions,
} from './interface';
import { request } from '../utils/request';

const debug = require('debug')('datahub.client');

declare module '@zodash/onion' {
  export interface Input {
    clientRequestBody: ClientProxyRequest;
    clientRequestOptions?: ProxyClientRequestOptions;
  }

  export interface Output {
    response: ResponseBody;
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

  constructor(private readonly config: ProxyClientConfig = {} as ProxyClientConfig) {}

  public use(middleware: Middleware<Context>) {
    this.app.use(middleware);
    return this;
  }

  private core(): Middleware<Context> {
    return async (ctx, next) => {
      const { server, endpoint, method, headers: _headers } = this.config;
      const { clientRequestBody, clientRequestOptions } = ctx.input;
      const { connectProxyHeaders, dataProxyHeaders, handshake, target } = clientRequestOptions || {};

      const url = `${server}${endpoint}`;
      const headers = {
        ..._headers,
        ...connectProxyHeaders,
        // 
        'Content-Type': 'application/json',
      };

      clientRequestBody.method = clientRequestBody.method || 'GET';

      clientRequestBody.headers = {
        ...clientRequestBody.headers,
        ...dataProxyHeaders,
      };

      const clientRequestBodyObject: ClientRequestBody = {
        attributes: {
          // handshake info
          handshake,

          // dynamic target, see ProxyClientRequestOptions['target']
          target,
        },
        values: clientRequestBody,
        timestamps: +new Date(),
      };

      debug(clientRequestBody.body);

      const body = JSON.stringify(clientRequestBodyObject);
      
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

  public async request<I extends object>(clientRequestBody: ClientProxyRequest, clientRequestOptions?: ProxyClientRequestOptions) {
    if (!this.setupDone) {
      this.setup();
    }

    return this.app
      .execute({ clientRequestBody, clientRequestOptions } as any)
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

      const { server } = this.config;
      const { method, path } = ctx.input.clientRequestBody;
      const { status } = ctx.output.response;
      const requestTime = +new Date() - ctx.state.requestStartTime;
      ctx.state.requestTime = requestTime;

      this.logger.log(`${method} ${path} ${status} +${requestTime} (server: ${server})`);
    };
  }
}