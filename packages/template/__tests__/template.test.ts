import { get } from '@zodash/get';
import { template } from '../src/template';

describe('@zodash/template', () => {
  it('Author: {author}, From: {from}', () => {
    const pattern = 'Author: {author}, From: {from}';
    const map = { author: 'Zero', from: 'China' };
    expect(template(pattern, map)).toBe('Author: Zero, From: China');
  });

  it('Author: {author}, From: {from}, {NOTEXIST}', () => {
    const pattern = 'Author: {author}, From: {from}, {NOTEXIST}';
    const map = { author: 'Zero', from: 'China' };
    expect(template(pattern, map)).toBe('Author: Zero, From: China, ');
  });

  it('Custom Seperator {{x}}', () => {
    const pattern = 'Author: {{author}}, From: {{from}}, {{NOTEXIST}}';
    const map = { author: 'Zero', from: 'China' };
    expect(template(pattern, map, { start: '{{', end: '}}' })).toBe(
      'Author: Zero, From: China, ',
    );
  });

  it('Custom Seperator #x#', () => {
    const pattern = 'Author: #author#, From: #from#, #NOTEXIST#';
    const map = { author: 'Zero', from: 'China' };
    expect(template(pattern, map, { start: '#', end: '#' })).toBe(
      'Author: Zero, From: China, ',
    );
  });

  it('map function', () => {
    const pattern = 'Author: {author}, From: {from}, GirlFriend: {girl.name}';
    const map = { author: 'Zero', from: 'China', girl: { name: 'any' } };
    expect(
      template(pattern, (key) => get(map, key), // map[key];
      ),
    ).toBe('Author: Zero, From: China, GirlFriend: any');
  });
});
