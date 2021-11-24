import { OrderBook, OrderBookDiff } from './orderbook';

export class OrderBooks {
  orderbooks: Record<string, OrderBook> = {};

  get(symbol: string, level = 1000) {
    let orderbook = this.orderbooks[symbol];
    if (!orderbook) {
      orderbook = new OrderBook(symbol);
      this.orderbooks[symbol] = orderbook;
    }

    return orderbook.toJSON(level);
  }

  update(symbol: string, diff: OrderBookDiff) {
    let orderbook = this.orderbooks[symbol];
    if (!orderbook) {
      orderbook = new OrderBook(symbol);
      this.orderbooks[symbol] = orderbook;
    }

    orderbook.update(diff);
  }

  price(symbol: string) {
    const orderbook = this.get(symbol);
    if (!orderbook.asks[0] || !orderbook.bids[0]) return 0;
    return ((orderbook.asks[0][0] + orderbook.bids[0][0]) / 2).toFixed(2);
  }
}
