import * as qs from '@zcorky/query-string';

export function getQuery() {
  return qs.parse(location.search);
}

export default getQuery;
