import * as qs from '@zcorky/query-string';

export function getQuery(name?: string) {
  const query = qs.parse(location.search);
  if (name) {
    return query[name];
  }

  return query;
}

export default getQuery;
