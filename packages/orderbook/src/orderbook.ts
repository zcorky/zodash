import { createMatcher, binaryInsert, binarySearchIndex } from './utils';

/**
 * [Price, Volume]
 */
export type Trade = [number, number] | number[];

export interface OrderBookDiff {
  asks: Trade[];
  bids: Trade[];
}

interface Action {
  type: 'INSERT' | 'UPDATE' | 'REMOVE';
  value: number;
  side: 'asks' | 'bids';
  collection: number[];
  index: number;
}

export interface OrderBookOptions {
  maxCapacity?: number;
}

export class OrderBook {
  asks: Trade[] = [];
  bids: Trade[] = [];
  timestamp = Date.now();

  constructor(
    private readonly symbol: string,
    private readonly options?: OrderBookOptions,
  ) {}

  private get maxCapacity() {
    return this.options?.maxCapacity ?? 1000;
  }

  toJSON(level = 1000) {
    const symbol = this.symbol;
    const timestamp = this.timestamp;
    const asks = this.asks.slice(0, level);
    const bids = this.bids.slice(0, level);

    return { symbol, timestamp, asks, bids };
  }

  update(diff: OrderBookDiff) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const orderbook = this;

    const match = createMatcher<Action>({
      INSERT: ({ collection, side, value }) => {
        if (side === 'asks') {
          return binaryInsert(collection, value, (el) => {
            return value[0] - el[0];
          });
        }

        return binaryInsert(collection, value, (el) => {
          return el[0] - value[0];
        });
      },
      UPDATE: ({ collection, index, value }) => {
        collection[index][1] = value[1];
      },
      REMOVE: ({ collection, index }) => collection.splice(index, 1),
    });

    const applyDiffOne = (side: 'asks' | 'bids', value: Trade) => {
      const collection = orderbook[side];

      const index = binarySearchIndex(collection, (el) => {
        if (side === 'asks') {
          return value[0] - el[0];
        }

        return el[0] - value[0];
      });

      const action = ({
        side,
        value,
        collection,
      } as any) as Action;

      if (index !== -1) {
        action.index = index;
        if (value[1] === 0) {
          action.type = 'REMOVE';
        } else {
          action.type = 'UPDATE';
        }
      } else {
        if (value[1] === 0) {
          return;
        }

        action.type = 'INSERT';
      }

      match(action);
    };

    function applyDiff() {
      if (orderbook.asks.length === 0) {
        orderbook.asks = diff.asks.slice();
        orderbook.bids = diff.bids.slice();

        return;
      }

      diff.asks.forEach((d) => applyDiffOne('asks', d));
      diff.bids.forEach((d) => applyDiffOne('bids', d));
    }

    applyDiff();

    // @TODO
    if (orderbook.asks.length >= orderbook.maxCapacity) {
      orderbook.asks = orderbook.asks.slice(0, orderbook.maxCapacity);
    }

    if (orderbook.bids.length >= orderbook.maxCapacity) {
      orderbook.bids = orderbook.bids.slice(0, orderbook.maxCapacity);
    }

    this.timestamp = Date.now();
  }
}