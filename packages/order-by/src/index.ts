export type Factor = [string, 'ASC' | 'DESC'];

// MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// v === 0, 位置不变
// v < 0,  a 在前
// v > 0, b 在前
function compare(a: number | string, b: number | string) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function genrateCompareFn<T>(factors: Factor[]) {
  return (a: T, b: T) => {
    let res = 0;

    factors.some(([key, order]) => {
      const sorter = compare(a[key], b[key]);

      // 当前字段相同，排序下一个字段
      if (sorter === 0) {
        return false;
      }
    
      // a 在前
      if (sorter < 0) {
        if (order === 'ASC') {
          res = -1;
        } else if (order === 'DESC') {
          res = 1;
        } else {
          throw new Error(`Only allow ASC | DESC, but got ${order}`);
        }

        return true;
      }
      
      // b 在前
      if (sorter > 0) {
        if (order === 'ASC') {
          res = 1;
        } else if (order === 'DESC') {
          res = -1;
        } else {
          throw new Error(`Only allow ASC | DESC, but got ${order}`);
        }

        return true;
      }
    });

    return res;
  }
}

export function orderBy<T>(dataSource: T[], factors: Factor[]) {
  const compareFn = genrateCompareFn<T>(factors);
  return dataSource.sort(compareFn);
}

export default orderBy;
