import { get } from '@zodash/get';
import { format } from './../src/format';

describe('@zodash/format', () => {
  it('Author: {author}, From: {from}', () => {
    const pattern = 'Author: {author}, From: {from}';
    const map = { author: 'Zero', from: 'China' };
    expect(format(pattern, map)).toBe('Author: Zero, From: China');
  });

  it('Author: {author}, From: {from}, {NOTEXIST}', () => {
    const pattern = 'Author: {author}, From: {from}, {NOTEXIST}';
    const map = { author: 'Zero', from: 'China' };
    expect(format(pattern, map)).toBe('Author: Zero, From: China, ');
  });

  it('Custom Seperator {{x}}', () => {
    const pattern = 'Author: {{author}}, From: {{from}}, {{NOTEXIST}}';
    const map = { author: 'Zero', from: 'China' };
    expect(format(pattern, map, { start: '{{', end: '}}' })).toBe(
      'Author: Zero, From: China, '
    );
  });

  it('Custom Seperator #x#', () => {
    const pattern = 'Author: #author#, From: #from#, #NOTEXIST#';
    const map = { author: 'Zero', from: 'China' };
    expect(format(pattern, map, { start: '#', end: '#' })).toBe(
      'Author: Zero, From: China, '
    );
  });

  it('map function', () => {
    const pattern = 'Author: {author}, From: {from}, GirlFriend: {girl.name}';
    const map = { author: 'Zero', from: 'China', girl: { name: 'any' } };
    expect(
      format(pattern, (key) => {
        return get(map, key); // map[key];
      })
    ).toBe('Author: Zero, From: China, GirlFriend: any');
  });

  it('nest map', () => {
    const pattern =
      'Author: {author.name}, From: {from}, GirlFriend: {girl.name}';
    const map = {
      author: { name: 'Zero' },
      from: 'China',
      girl: { name: 'any' },
    };
    expect(
      format(pattern, (key) => {
        return get(map, key); // map[key];
      })
    ).toBe('Author: Zero, From: China, GirlFriend: any');
  });
});
