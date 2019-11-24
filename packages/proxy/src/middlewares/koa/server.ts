import { Middleware, Context } from '@koex/core';
import { ProxyServer } from '../../core/server';
import { ProxyServerConfig, HandShakeMethd } from '../../core/interface';

const assert = require('assert');

declare module '@koex/core' {
  export interface Context {
    proxyServer: ProxyServer;
  }
}

export interface Options extends ProxyServerConfig {
  handShakeMethod?: HandShakeMethd;
}

export function createProxyServer(options: Options): Middleware<Context> {
  const proxy = new ProxyServer(options);

  if (typeof options.handShakeMethod === 'function') {
    proxy.setHandShakeMethod(options.handShakeMethod);
  }

  return async (ctx, next) => {
    /**
     * assign proxy
     */
    ctx.proxyServer = proxy;

    if (ctx.method != proxy.config.method || ctx.path !== proxy.config.endpoint) {
      return next();
    }
  
    assert((ctx.request as any).body, 'ctx.request.body is undefined, make sure you have using body parser middleware.');
  
    const proxyBody = (ctx.request as any).body;
    const { handshake, ...requestBody } = proxyBody;
    
    const response = await proxy.request(requestBody, {
      handshake,
    });
  
    const headers = response.headers.raw() as any;
    ctx.set(headers);
    ctx.body = response.body;
  }
}