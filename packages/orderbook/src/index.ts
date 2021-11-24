import { OrderBooks } from './orderbooks';

export * from './orderbook';
export * from './orderbooks';

export function createOrderbooks() {
  return new OrderBooks();
}
