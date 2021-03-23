import fileSize from '../src';

describe('@zodash/fileSize', () => {
  it('works', () => {
    expect(fileSize(5)).toBe('5');
    expect(fileSize(1500)).toBe('1.46K');
    expect(fileSize(1500000)).toBe('1.43M');
    expect(fileSize(1500000000)).toBe('1.4G');
    expect(fileSize(1500000000000)).toBe('1.36T');
  });
});
