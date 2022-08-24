import { Factor, orderBy } from '@zodash/order-by';

export { Factor };

export function sortBy<T>(dataSource: T[], factors: Factor[]) {
  return orderBy(dataSource, factors);
}

export default sortBy;
