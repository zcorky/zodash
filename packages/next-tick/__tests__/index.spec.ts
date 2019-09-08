import { nextTick } from '../src/next-tick';

describe('@zodash/nextTick', () => {
  it('using setImmediate', () => {
    const data = [];
    const a = () => data.push('a');
    const b = () => data.push('b');
    const c = () => data.push('c');
    const d = () => data.push('d');

    a();
    nextTick(c);
    nextTick(d);
    b();
    
    expect(data).toEqual(['a', 'b']);
    nextTick(() => {
      expect(data).toEqual(['a', 'b', 'c', 'd']);
    });
  });

  it('using setTimeout', () => {
    global.setImmediate = undefined;

    const data = [];
    const a = () => data.push('a');
    const b = () => data.push('b');
    const c = () => data.push('c');
    const d = () => data.push('d');

    a();
    nextTick(c);
    nextTick(d);
    b();
    
    expect(data).toEqual(['a', 'b']);
    nextTick(() => {
      expect(data).toEqual(['a', 'b', 'c', 'd']);
    });
  });

  it('pass arguments', () => {
    global.setImmediate = undefined;

    const data = [];
    const a = () => data.push('a');
    const b = () => data.push('b');
    const c = (name: string) => { data.push(name); };
    const d = (name: string) => { data.push(name); };

    a();
    nextTick(c, 'c');
    nextTick(d, 'd');
    b();
    
    expect(data).toEqual(['a', 'b']);
    nextTick(() => {
      expect(data).toEqual(['a', 'b', 'c', 'd']);
    });
  });
});
