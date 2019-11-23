import App from '@koex/core';
import body from '@koex/body';
// import { ProxyServer } from '../src/core/server';
import { createProxyServer } from '../src/middlewares/koa/server';

const app = new App();
// const proxy = new ProxyServer({
//   method: 'POST',
//   endpoint: '/proxy',
//   target: 'https://httpbin.zcorky.com',
//   enableCache: false,
// });

// proxy.setHandShakeMethod(async (handshake) => {
//   console.log('handshake: ', handshake);
//   // const error = new Error('Forbidden') as any;
//   // error.status = 403;
//   // throw error;
// });

app.use(body());

app.use(createProxyServer({
  method: 'POST',
  endpoint: '/proxy',
  target: 'https://httpbin.zcorky.com',
  enableCache: false,
  handShakeMethod: async (handshake) => {
    console.log('handshake: ', handshake);
    const validated = handshake.appId === 'app-id' && handshake.appToken === 'app-token';

    if (!validated) {
        const error = new Error('Forbidden') as any;
        error.status = 403;
        throw error;
    }

    console.log('handshake successfully');
  },
}));

// app.use(async (ctx, next) => {
//   if (ctx.method != proxy.config.method || ctx.path !== proxy.config.endpoint) {
//     return next();
//   }

//   const proxyBody = ctx.request.body;
//   const { handshake, ...requestBody } = proxyBody;

//   // console.log(proxyBody.headers);
  
//   const response = await proxy.request(requestBody, {
//     handshake,
//   });

  
//   // ctx.set(response.headers.raw() as any);

//   // ctx.body = {
//   //   status: response.status,
//   //   statusText: response.statusText,
//   //   size: response.size,
//   //   timeout: response.timeout,
//   //   headers: response.headers.raw(),
//   // };

//   // console.log(JSON.stringify(response.headers.raw()));

//   // ctx.set('Content-Type', response.headers.get('Content-Type')!);
//   // ctx.set(response.headers.raw() as any);
//   const headers = response.headers.raw() as any; // omit(response.headers.raw() as any, ['content-encoding']);
//   ctx.set(headers);
//   ctx.body = response.body;
// });

app.get('/', async (ctx) => {
  ctx.body = {
    message: 'hello world',
  };
});

(app as any).listen(8080, '0.0.0.0', () => {
  console.log('server start at: http://127.0.0.1:8080');
});