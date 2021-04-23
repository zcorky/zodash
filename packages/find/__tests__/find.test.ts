import { deepEqual } from '@zcorky/deep-equal';
import { find } from '../src/find';

describe('@zodash/find', () => {
  it('array', () => {
    const v = [
      { name: 'barney', age: 36, active: true },
      { name: 'fred', age: 40, active: false },
      { name: 'pebbles', age: 1, active: true },
    ];

    const fn = (user: any) => user.name === 'fred';
    const v1 = find(v, fn);
    const v2 = v.find(fn);

    expect(deepEqual(v1, v2)).toBeTruthy();
    expect(
      deepEqual(v1, { name: 'fred', age: 40, active: false })
    ).toBeTruthy();
    expect(find(v, (u) => u.name === 'x')).toEqual(null);
  });

  it('object', () => {
    const data = {
      name: 'barney',
      age: 36,
      active: true,
    };

    expect(find(data, ([k]) => /^age/.test(k))).toEqual(['age', 36]);
    expect(find(data, ([k]) => k === 'x')).toEqual(null);
  });

  it('map', () => {
    const data = new Map<RegExp, string>();
    data.set(
      /^(622812|622810|622811|628310|625919)\d{10}$/,
      '中国邮政储蓄银行'
    );
    data.set(
      /^(622200|622202|622203|622208|621225|620058|621281|900000|621558|621559|621722|621723|620086|621226|621618|620516|621227|621288|621721|900010|623062|621670|621720|621379|621240|621724|621762|621414|621375|622926|622927|622928|622929|622930|622931|621733|621732|621372|621369|621763)\d{13}$/,
      '中国工商银行'
    );
    data.set(/^(103)\d{16}$/, '中国农业银行');

    expect(find(data, ([re]) => re.test('6222005865412565805'))[1]).toEqual(
      '中国工商银行'
    );
    expect(find(data, ([re]) => re.test('123456'))).toEqual(null);
  });
});
