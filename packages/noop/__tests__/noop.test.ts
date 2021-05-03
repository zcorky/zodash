import { noop } from '../src/noop';

describe('@zodash/noop', () => {
  it('needs tests', () => {
    expect(noop()).toBeUndefined();
  });

  it('typescript generic', () => {
    type Fn = (x: number, y: number, name: string) => [number, number];
    function go(_fn: Fn = noop) {}
    // type Params = Parameters<Fn>;
  });
});
