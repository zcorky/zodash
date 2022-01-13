import { OrderBook, OrderBookDiff } from './orderbook';

export class OrderBooks<T extends number | string = number> {
  private orderbooks: Record<string, OrderBook<T>> = {};

  private getId(symbol: string, tradeType: string) {
    return `${symbol}-${tradeType}`;
  }

  public get(symbol: string, tradeType: string, level = 1000) {
    const id = this.getId(symbol, tradeType);
    let orderbook = this.orderbooks[id];
    if (!orderbook) {
      orderbook = new OrderBook(symbol, tradeType);
      this.orderbooks[id] = orderbook;
    }

    return orderbook.get(level);
  }

  update(symbol: string, tradeType: string, diff: OrderBookDiff<T>) {
    const id = this.getId(symbol, tradeType);
    let orderbook = this.orderbooks[id];
    if (!orderbook) {
      orderbook = new OrderBook(symbol, tradeType);
      this.orderbooks[id] = orderbook;
    }

    orderbook.update(diff);
  }

  price(symbol: string, tradeType: string) {
    const orderbook = this.get(symbol, tradeType);
    if (!orderbook.asks[0] || !orderbook.bids[0]) return 0;
    return ((+orderbook.asks[0][0] + +orderbook.bids[0][0]) / 2).toFixed(2);
  }
}
