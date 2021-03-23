import { shorturl } from '../src/shorturl';

describe('@zodash/shorturl', () => {
  it('length 6', () => {
    expect(shorturl('http://example.com').length).toBe(6);
    expect(shorturl('http://github.com/zcorky/zodash').length).toBe(6);
    expect(shorturl('http://github.com/whatwewant').length).toBe(6);
    expect(
      shorturl(
        'https://www.google.com/search?q=nodejs+10+%E8%BF%9B%E5%88%B6%E8%BD%AC%E4%B8%BA+62+%E8%BF%9B%E5%88%B6&oq=nodejs+10+%E8%BF%9B%E5%88%B6%E8%BD%AC%E4%B8%BA+62+%E8%BF%9B%E5%88%B6&aqs=chrome..69i57.14044j0j1&sourceid=chrome&ie=UTF-8',
      ).length,
    ).toBe(6);
  });

  it('same', () => {
    const short = shorturl('http://example.com');
    expect(short).toBe(shorturl('http://example.com'));
    expect(short).toBe(shorturl('http://example.com'));
    // console.log('shorturl:', shorturl('https://www.google.com/search?q=nodejs+10+%E8%BF%9B%E5%88%B6%E8%BD%AC%E4%B8%BA+62+%E8%BF%9B%E5%88%B6&oq=nodejs+10+%E8%BF%9B%E5%88%B6%E8%BD%AC%E4%B8%BA+62+%E8%BF%9B%E5%88%B6&aqs=chrome..69i57.14044j0j1&sourceid=chrome&ie=UTF-8'));
    expect(
      shorturl(
        'https://www.google.com/search?q=nodejs+10+%E8%BF%9B%E5%88%B6%E8%BD%AC%E4%B8%BA+62+%E8%BF%9B%E5%88%B6&oq=nodejs+10+%E8%BF%9B%E5%88%B6%E8%BD%AC%E4%B8%BA+62+%E8%BF%9B%E5%88%B6&aqs=chrome..69i57.14044j0j1&sourceid=chrome&ie=UTF-8',
      ),
    ).toBe(
      shorturl(
        'https://www.google.com/search?q=nodejs+10+%E8%BF%9B%E5%88%B6%E8%BD%AC%E4%B8%BA+62+%E8%BF%9B%E5%88%B6&oq=nodejs+10+%E8%BF%9B%E5%88%B6%E8%BD%AC%E4%B8%BA+62+%E8%BF%9B%E5%88%B6&aqs=chrome..69i57.14044j0j1&sourceid=chrome&ie=UTF-8',
      ),
    );
  });
});
