import IDCard from '../src';

describe('@zodash/idcard', () => {
  it('valid', () => {
    const id = new IDCard('440308199901101512');

    expect(id.toJSON()).toEqual({
      address: '广东省深圳市盐田区',
      birthday: '1999-01-10',
      age: new Date().getFullYear() - 1999,
      sex: 1,
    });

    expect(id.getAddress()).toEqual({
      text: '广东省深圳市盐田区',
      list: ['广东省', '深圳市', '盐田区'],
    });
    expect(id.getBirthday()).toEqual('1999-01-10');
    expect(id.getAge()).toEqual(new Date().getFullYear() - 1999);
    expect(id.getSex()).toEqual(1);
    expect(id.getCheckCode()).toEqual('2');
    expect(id.length()).toEqual(18);

    expect(id.isValid()).toBeTruthy();
    expect(id.isAdult()).toBeTruthy();
    expect(id.isMale()).toBeTruthy();
    expect(id.isFemale()).toBeFalsy();
  });

  it('invalid format', () => {
    expect(new IDCard('40308199901101512').isValid()).toBeFalsy();
    expect(new IDCard('5440308199901101512').isValid()).toBeFalsy();
  });

  it('invalid address', () => {
    expect(new IDCard('840308199901101512').isValid()).toBeFalsy();
  });

  it('invalid age', () => {
    expect(new IDCard('440308299901101512').isValid()).toBeFalsy();
  });
});
