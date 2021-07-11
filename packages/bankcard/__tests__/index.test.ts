import * as bankcard from '../src';

describe('@zodash/idcard', () => {
  it('parse bank', async () => {
    const bank = await bankcard.parse('6222005865412565805');
    // console.log(bank);

    console.log(bank);
    expect(bank.code).toEqual('ICBC');
    expect(bank.type.code).toEqual('DC');
    expect(bank.name).toEqual('中国工商银行');
    expect(bank.type.name).toEqual('储蓄卡');

    //
    expect(await bankcard.parse('6212824565761234567')).toEqual({
      name: '中国农业银行',
      code: 'ABC',
      type: { name: '储蓄卡', code: 'DC' },
    });

    expect(await bankcard.parse('1036545546576812345')).toEqual({
      name: '中国农业银行',
      code: 'ABC',
      type: { name: '储蓄卡', code: 'DC' },
    });
  });

  it('validate bank', async () => {
    expect(await bankcard.validate('6212824565761234567')).toBeTruthy();
    expect(await bankcard.validate('621282456576123456')).toBeFalsy();
  });

  it('maybe bank', async () => {
    const cardNumber = '621282456576123';

    expect(await bankcard.validate(cardNumber)).toBeFalsy();
    expect(await bankcard.maybe(cardNumber)).toEqual({
      name: '中国农业银行',
      code: 'ABC',
      type: { name: '储蓄卡', code: 'DC' },
    });
  });

  it('twice value should the same', async () => {
    const cardNumber = '6217002920108228586';
    const res = {
      name: '中国建设银行',
      code: 'CCB',
      type: { name: '储蓄卡', code: 'DC' },
    };

    expect(await bankcard.parse(cardNumber)).toEqual(res);
    expect(await bankcard.parse(cardNumber)).toEqual(res);
  });
});
