import orderBy, { Factor } from '../src';
import * as lodash from 'lodash';

describe('@zodash/order-by', () => {
  it('works', () => {
    const dataSource = [
      { name: 10, day: 10, three: 1 },
      { name: 9, day: 9, three: 1 },
      { name: 9, day: 7, three: 1 },
      { name: 9, day: 7, three: 4 },
      { name: 9, day: 7, three: 2 },
      { name: 9, day: 7, three: 3 },
      { name: 9, day: 8, three: 1 },
      { name: 8, day: 10, three: 1 },
    ];

    const orders: Factor[] = [
      ['name', 'ASC'],
      ['day', 'DESC'],
      ['three', 'ASC'],
    ];

    const expected = [
      { name: 8, day: 10, three: 1 },
      { name: 9, day: 9, three: 1 },
      { name: 9, day: 8, three: 1 },
      { name: 9, day: 7, three: 1 },
      { name: 9, day: 7, three: 2 },
      { name: 9, day: 7, three: 3 },
      { name: 9, day: 7, three: 4 },
      { name: 10, day: 10, three: 1 },
    ];

    expect(orderBy(dataSource, orders)).toEqual(expected);
    expect(orderBy(dataSource, orders))
      .toEqual(lodash.orderBy(
        dataSource,
        ['name', 'day', 'three'],
        ['asc', 'desc', 'asc'],
      ));
  });
});
