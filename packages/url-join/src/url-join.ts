export function urlJoin(...segs: string[]) {
  const lastSegs = (segs[segs.length - 1] || '').split('?');
  const args = [...segs.slice(0, -1), lastSegs.shift()];
  
  const retSegs = [
    args
      .filter(Boolean)
      .join('/')
      .replace(/\/+/g, '/')
      .replace('http:/', 'http://')
      .replace('https:/', 'https://'),
  ];

  retSegs.push.apply(retSegs, lastSegs);

  return retSegs.join('?');
}