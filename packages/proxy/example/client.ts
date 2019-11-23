import App from '@koex/core';
import body from '@koex/body';
// import { ProxyClient } from '../src/core/client';
import { createProxyClient } from '../src/middlewares/koa/client';

const app = new App();
// const proxy = new ProxyClient({
//   server: 'http://127.0.0.1:8080',
//   method: 'POST',
//   endpoint: '/proxy',
// });

app.use(body());

app.use(createProxyClient({
  server: 'http://127.0.0.1:8080',
  method: 'POST',
  endpoint: '/proxy',

  //
  clientEndpoint: '/api',
  //
  handshake: {
    appId: 'app-id',
    appToken: 'app-token',
    timestamps: +new Date(),
  },

  dataProxyHeaders: async (ctx) => ({
    'X-Origin-App': 'origin-app',
    'Authorization': `Bearer ${ctx.cookies.get('xxx') || 'No-Token'}`, // ctx.service.authorization.token
  }),
}));

// app.use(async (ctx, next) => {
//   if (!ctx.path.startsWith('/api')) {
//     return await next();
//   }

//   // console.log(JSON.stringify(ctx.headers));
//   const response = await proxy.request({
//     method: ctx.method,
//     path: ctx.path.replace('/api', ''),
//     headers: ctx.headers,
//     body: ctx.request.body,
//   }, {
//     handshake: {
//       appId: 'app-claim',
//       appToken: '6666666',
//       timestamps: +new Date(),
//     },
//   });

//   // ctx.set(response.);
//   ctx.set(response.headers.raw() as any);
//   ctx.body = response.body;
// });

app.get('/', async (ctx) => {
  ctx.body = {
    message: 'hello world',
  };
});

(app as any).listen(8081, '0.0.0.0', () => {
  console.log('server start at: http://127.0.0.1:8081');
});