import { Context } from 'egg';

export function getMethod(ctx: Context) {
  return ctx.method;
}