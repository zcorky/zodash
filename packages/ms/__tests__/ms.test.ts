import { map } from '@zodash/map';
import { ms } from '../src/ms';

describe('@zodash/alias', () => {
  const machine = [
    10,
    1000,
    60 * 1000,
    60 * 60 * 1000,
    24 * 60 * 60 * 1000,
    365 * 24 * 60 * 60 * 1000,
  ];

  const human = ['10ms', '1s', '1m', '1h', '1d', '365d'];

  it('number => string', () => {
    const t = ((e, index) => {
      expect(ms(e)).toBe(human[index]);
    }) as any;

    map(machine, t);
  });

  it('string => number', () => {
    const t = ((e, index) => {
      expect(ms(e)).toBe(machine[index]);
    }) as any;

    map(human, t);
  });

  it('1w => 7 * 24 * 60 * 60 * 1000', () => {
    expect(ms('1w')).toEqual(7 * 24 * 60 * 60 * 1000);
    expect(ms(7 * 24 * 60 * 60 * 1000)).toEqual('7d');
  });

  it('unknown', () => {
    expect(ms('1x')).toEqual(undefined);
    expect(ms('1mx')).toEqual(undefined);
  });

  it('number < 0', () => {
    expect(ms(-1)).toEqual(undefined);
  });

  // it('humanize milisecons', () => {
  //   const hs = [[1630600086967, '51y 257d 16h 28m 6.9s']];

  //   for (const one of hs) {
  //     expect(ms(one[0] as number)).toEqual(one[1]);
  //   }
  // });
});
