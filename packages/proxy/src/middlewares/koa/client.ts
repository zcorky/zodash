import { Middleware, Context } from '@koex/core';
import { ProxyClient } from '../../core/client';
import { ProxyClientConfig, HandShake, ProxyClientRequestOptions } from '../../core/interface';

const assert = require('assert');

declare module '@koex/core' {
  export interface Context {
    proxyClient: ProxyClient;
  }
}

export interface Options extends ProxyClientConfig {
  handshake: HandShake;
  clientEndpoint: string;
  
  connectProxyHeaders?: ProxyClientRequestOptions['connectProxyHeaders'] | ((ctx: Context) => Promise<ProxyClientRequestOptions['connectProxyHeaders']>);
  dataProxyHeaders?: ProxyClientRequestOptions['dataProxyHeaders'] | ((ctx: Context) => Promise<ProxyClientRequestOptions['dataProxyHeaders']>);
}

export function createProxyClient(options: Options): Middleware<Context> {
  const proxy = new ProxyClient(options);

  return async (ctx, next) => {
    /**
     * assign proxy
     */
    ctx.proxyClient = proxy;

    if (!ctx.path.startsWith(options.clientEndpoint)) {
      return await next();
    }

    assert((ctx.request as any).body, 'ctx.request.body is undefined, make sure you have using body parser middleware.');
  
    const connectProxyHeaders = typeof options.connectProxyHeaders === 'function'
      ? await options.connectProxyHeaders(ctx) : options.connectProxyHeaders;
    const dataProxyHeaders = typeof options.dataProxyHeaders === 'function'
      ? await options.dataProxyHeaders(ctx) : options.dataProxyHeaders;

    const response = await proxy.request({
      method: ctx.method,
      path: ctx.path.replace(options.clientEndpoint, ''),
      headers: ctx.headers,
      body: (ctx.request as any).body,
    }, {
      handshake: {
        ...options.handshake,
        timestamps: +new Date(),
      },
      connectProxyHeaders,
      dataProxyHeaders,
    });
  
    ctx.set(response.headers.raw() as any);
    ctx.body = response.body;
  }
}