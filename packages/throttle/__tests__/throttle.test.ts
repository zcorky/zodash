import throttle from '../src/throttle';

describe('throttle', () => {
  function counter() {
    function count() {
      // tslint:disable-line
      (count as any).invoked++;
    }
    (count as any).invoked = 0;
    return count;
  }

  let count;

  beforeEach(() => {
    count = counter();
  });

  it('should throttle a function', (done) => {
    const wait = 100;
    const total = 500;
    const fn = throttle(count, wait);
    const interval = setInterval(fn, 20);
    setTimeout(() => {
      clearInterval(interval);
      expect(count.invoked).toEqual(total / wait);
      done();
    }, total + 5);
  });

  it('should call the function last time', (done) => {
    const wait = 100;
    const fn = throttle(count, wait);
    fn();
    fn();
    expect(count.invoked).toEqual(1);
    setTimeout(() => {
      expect(count.invoked).toEqual(2);
      done();
    }, wait + 5);
  });
});
