import { format } from './../src/format';

describe("@zodash/format", () => {
  it("Author: {author}, From: {from}", () => {
    const pattern = 'Author: {author}, From: {from}';
    const map = { author: 'Zero', from: 'China' };
    expect(format(pattern, map)).toBe('Author: Zero, From: China');
  });

  it("Author: {author}, From: {from}, {NOTEXIST}", () => {
    const pattern = 'Author: {author}, From: {from}, {NOTEXIST}';
    const map = { author: 'Zero', from: 'China' };
    expect(format(pattern, map)).toBe('Author: Zero, From: China, ');
  });

  it("Custom Seperator {{x}}", () => {
    const pattern = 'Author: {{author}}, From: {{from}}, {{NOTEXIST}}';
    const map = { author: 'Zero', from: 'China' };
    expect(format(pattern, map, { start: '{{', end: '}}'})).toBe('Author: Zero, From: China, ');
  });

  it("Custom Seperator #x#", () => {
    const pattern = 'Author: #author#, From: #from#, #NOTEXIST#';
    const map = { author: 'Zero', from: 'China' };
    expect(format(pattern, map, { start: '#', end: '#'})).toBe('Author: Zero, From: China, ');
  });
});
