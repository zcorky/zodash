import { createOrderbooks } from '../src';

describe('@zodash/orderbook', () => {
  const orderbooks = createOrderbooks();
  const symbol = 'ETHUSDT';
  const tradeType = 'SPOT';

  it('works', async () => {
    const diff = {
      asks: [
        [4263.15, 270.57],
        [4263.25, 58.64],
        [4263.35, 1.02],
        [4263.6, 43.64],
        [4263.7, 0.32],
        [4263.8, 70.35],
        [4263.85, 0.4],
        [4263.9, 4.12],
        [4263.95, 2.98],
        [4264, 3.41],
        [4264.05, 7.32],
        [4264.1, 2.91],
        [4264.15, 8.75],
        [4264.2, 12.98],
        [4264.25, 24.42],
        [4264.4, 2.39],
        [4264.65, 2.63],
        [4264.7, 17.93],
        [4264.8, 2.62],
        [4264.85, 29.22],
        [4265.3, 4],
        [4265.55, 1.43],
        [4265.65, 10],
        [4265.7, 15.38],
        [4265.75, 9.97],
      ],
      bids: [
        [4263.1, 260.85],
        [4263.05, 2.61],
        [4263, 0.47],
        [4262.55, 5.19],
        [4262.5, 2.39],
        [4262.25, 2.58],
        [4262.2, 0.04],
        [4261.75, 1],
        [4261.7, 2.36],
        [4261.3, 0.4],
        [4260.9, 0.4],
        [4260.8, 0.46],
        [4260.75, 10],
        [4260.7, 0.01],
        [4260.6, 1.03],
        [4260.55, 35.2],
        [4260.5, 0.53],
        [4260.45, 14.62],
        [4260.4, 4.44],
        [4260.35, 3.22],
        [4260.3, 6.25],
        [4260.25, 1.3],
        [4260.2, 64.68],
        [4260.15, 0.85],
        [4260.05, 9.43],
      ],
      timestamp: Date.now(),
    };

    orderbooks.update(symbol, tradeType, diff);
    expect(orderbooks.get(symbol, tradeType).asks).toEqual(diff.asks);
    expect(orderbooks.get(symbol, tradeType).bids).toEqual(diff.bids);

    const diff2 = {
      asks: [[4264.8, 119.85]],
      bids: [],
      timestamp: Date.now(),
    };
    orderbooks.update(symbol, tradeType, diff2);
    expect(orderbooks.get(symbol, tradeType).asks).toEqual([
      [4263.15, 270.57],
      [4263.25, 58.64],
      [4263.35, 1.02],
      [4263.6, 43.64],
      [4263.7, 0.32],
      [4263.8, 70.35],
      [4263.85, 0.4],
      [4263.9, 4.12],
      [4263.95, 2.98],
      [4264, 3.41],
      [4264.05, 7.32],
      [4264.1, 2.91],
      [4264.15, 8.75],
      [4264.2, 12.98],
      [4264.25, 24.42],
      [4264.4, 2.39],
      [4264.65, 2.63],
      [4264.7, 17.93],
      [4264.8, 119.85],
      [4264.85, 29.22],
      [4265.3, 4],
      [4265.55, 1.43],
      [4265.65, 10],
      [4265.7, 15.38],
      [4265.75, 9.97],
    ]);
    expect(orderbooks.get(symbol, tradeType).bids).toEqual([
      [4263.1, 260.85],
      [4263.05, 2.61],
      [4263, 0.47],
      [4262.55, 5.19],
      [4262.5, 2.39],
      [4262.25, 2.58],
      [4262.2, 0.04],
      [4261.75, 1],
      [4261.7, 2.36],
      [4261.3, 0.4],
      [4260.9, 0.4],
      [4260.8, 0.46],
      [4260.75, 10],
      [4260.7, 0.01],
      [4260.6, 1.03],
      [4260.55, 35.2],
      [4260.5, 0.53],
      [4260.45, 14.62],
      [4260.4, 4.44],
      [4260.35, 3.22],
      [4260.3, 6.25],
      [4260.25, 1.3],
      [4260.2, 64.68],
      [4260.15, 0.85],
      [4260.05, 9.43],
    ]);

    const diff3 = { asks: [[4264.8, 2.62]], bids: [], timestamp: Date.now() };
    orderbooks.update(symbol, tradeType, diff3);
    expect(orderbooks.get(symbol, tradeType).asks).toEqual([
      [4263.15, 270.57],
      [4263.25, 58.64],
      [4263.35, 1.02],
      [4263.6, 43.64],
      [4263.7, 0.32],
      [4263.8, 70.35],
      [4263.85, 0.4],
      [4263.9, 4.12],
      [4263.95, 2.98],
      [4264, 3.41],
      [4264.05, 7.32],
      [4264.1, 2.91],
      [4264.15, 8.75],
      [4264.2, 12.98],
      [4264.25, 24.42],
      [4264.4, 2.39],
      [4264.65, 2.63],
      [4264.7, 17.93],
      [4264.8, 2.62],
      [4264.85, 29.22],
      [4265.3, 4],
      [4265.55, 1.43],
      [4265.65, 10],
      [4265.7, 15.38],
      [4265.75, 9.97],
    ]);
    expect(orderbooks.get(symbol, tradeType).bids).toEqual([
      [4263.1, 260.85],
      [4263.05, 2.61],
      [4263, 0.47],
      [4262.55, 5.19],
      [4262.5, 2.39],
      [4262.25, 2.58],
      [4262.2, 0.04],
      [4261.75, 1],
      [4261.7, 2.36],
      [4261.3, 0.4],
      [4260.9, 0.4],
      [4260.8, 0.46],
      [4260.75, 10],
      [4260.7, 0.01],
      [4260.6, 1.03],
      [4260.55, 35.2],
      [4260.5, 0.53],
      [4260.45, 14.62],
      [4260.4, 4.44],
      [4260.35, 3.22],
      [4260.3, 6.25],
      [4260.25, 1.3],
      [4260.2, 64.68],
      [4260.15, 0.85],
      [4260.05, 9.43],
    ]);

    const diff4 = {
      asks: [],
      bids: [
        [4260.25, 10.45],
        [4260.05, 0.28],
      ],
      timestamp: Date.now(),
    };
    orderbooks.update(symbol, tradeType, diff4);
    expect(orderbooks.get(symbol, tradeType).asks).toEqual([
      [4263.15, 270.57],
      [4263.25, 58.64],
      [4263.35, 1.02],
      [4263.6, 43.64],
      [4263.7, 0.32],
      [4263.8, 70.35],
      [4263.85, 0.4],
      [4263.9, 4.12],
      [4263.95, 2.98],
      [4264, 3.41],
      [4264.05, 7.32],
      [4264.1, 2.91],
      [4264.15, 8.75],
      [4264.2, 12.98],
      [4264.25, 24.42],
      [4264.4, 2.39],
      [4264.65, 2.63],
      [4264.7, 17.93],
      [4264.8, 2.62],
      [4264.85, 29.22],
      [4265.3, 4],
      [4265.55, 1.43],
      [4265.65, 10],
      [4265.7, 15.38],
      [4265.75, 9.97],
    ]);
    expect(orderbooks.get(symbol, tradeType).bids).toEqual([
      [4263.1, 260.85],
      [4263.05, 2.61],
      [4263, 0.47],
      [4262.55, 5.19],
      [4262.5, 2.39],
      [4262.25, 2.58],
      [4262.2, 0.04],
      [4261.75, 1],
      [4261.7, 2.36],
      [4261.3, 0.4],
      [4260.9, 0.4],
      [4260.8, 0.46],
      [4260.75, 10],
      [4260.7, 0.01],
      [4260.6, 1.03],
      [4260.55, 35.2],
      [4260.5, 0.53],
      [4260.45, 14.62],
      [4260.4, 4.44],
      [4260.35, 3.22],
      [4260.3, 6.25],
      [4260.25, 10.45],
      [4260.2, 64.68],
      [4260.15, 0.85],
      [4260.05, 0.28],
    ]);

    // expect asks0 price < bids0 price
    //  current:
    //    ask0 price: 4263.15
    //    bids0 price: 4260.25
    // orderbooks.update(symbol, tradeType, {
    //   asks: [],
    //   bids: [[]],
    // });
  });

  it('update asks', () => {
    const orderbooks = createOrderbooks();
    const symbol = 'ETHUSDT';
    const tradeType = 'SPOT';

    orderbooks.update(symbol, tradeType, {
      asks: [[1, 1]],
      bids: [],
      timestamp: Date.now(),
    });
    expect(orderbooks.get(symbol, tradeType).asks).toEqual([[1, 1]]);

    orderbooks.update(symbol, tradeType, {
      asks: [[1, 2]],
      bids: [],
      timestamp: Date.now(),
    });
    expect(orderbooks.get(symbol, tradeType).asks).toEqual([[1, 2]]);

    orderbooks.update(symbol, tradeType, {
      asks: [
        [1, 3],
        [1, 0.1],
        [1, 0.3],
      ],
      bids: [],
      timestamp: Date.now(),
    });
    expect(orderbooks.get(symbol, tradeType).asks).toEqual([[1, 0.3]]);
  });

  it('update bids', () => {
    const orderbooks = createOrderbooks<number>();
    const symbol = 'ETHUSDT';
    const tradeType = 'SPOT';

    orderbooks.update(symbol, tradeType, {
      bids: [[1, 1]],
      asks: [],
      timestamp: Date.now(),
    });
    expect(orderbooks.get(symbol, tradeType).bids).toEqual([[1, 1]]);

    orderbooks.update(symbol, tradeType, {
      bids: [[1, 2]],
      asks: [],
      timestamp: Date.now(),
    });
    expect(orderbooks.get(symbol, tradeType).bids).toEqual([[1, 2]]);

    orderbooks.update(symbol, tradeType, {
      bids: [
        [1, 3],
        [1, 0.1],
        [1, 0.3],
      ],
      asks: [],
      timestamp: Date.now(),
    });
    expect(orderbooks.get(symbol, tradeType).bids).toEqual([[1, 0.3]]);
  });

  it('price and volume allow type string', () => {
    const orderbooks = createOrderbooks<string>();
    const symbol = 'ETHUSDT';
    const tradeType = 'SPOT';
    orderbooks.update(symbol, tradeType, {
      bids: [['1', '1']],
      asks: [],
      timestamp: Date.now(),
    });
    expect(orderbooks.get(symbol, tradeType).bids).toEqual([['1', '1']]);
    expect(orderbooks.get(symbol, tradeType).asks).toEqual([]);

    orderbooks.update(symbol, tradeType, {
      bids: [['1', '3']],
      asks: [['2', '2']],
      timestamp: Date.now(),
    });
    expect(orderbooks.get(symbol, tradeType).bids).toEqual([['1', '3']]);
    expect(orderbooks.get(symbol, tradeType).asks).toEqual([['2', '2']]);

    orderbooks.update(symbol, tradeType, {
      bids: [['1', '0']],
      asks: [['2', '2']],
      timestamp: Date.now(),
    });
    expect(orderbooks.get(symbol, tradeType).bids).toEqual([]);
    expect(orderbooks.get(symbol, tradeType).asks).toEqual([['2', '2']]);
  });
});
