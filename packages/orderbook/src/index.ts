import { OrderBooks } from './orderbooks';

export * from './orderbook';
export * from './orderbooks';

export function createOrderbooks<T extends number | string = number>() {
  return new OrderBooks<T>();
}
