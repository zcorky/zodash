import { repeat } from '@zodash/repeat';
import random from '@zodash/random';
import { parallelLimit, ITask } from '../src/parallel-limit';

describe('@zodash/parallel-limit', () => {
  it('all done with results', (done) => {
    const tasks: ITask<any>[] = [
      function (cb) {
        cb(null, 1);
      },
      function (cb) {
        cb(null, 2);
      },
      function (cb) {
        cb(null, 3);
      },
      function (cb) {
        cb(null, 4);
      },
      function (cb) {
        cb(null, 5);
      },
      function (cb) {
        cb(null, 6);
      },
    ];

    parallelLimit(tasks, 2, (results) => {
      expect(results).toEqual([1, 2, 3, 4, 5, 6]);
      done();
    });
  });

  it('parallel some tasks has error', (done) => {
    const tasks: ITask<any>[] = [
      function (cb) {
        cb(null, 1);
      },
      function (cb) {
        cb(null, 2);
      },
      function (cb) {
        cb(null, 3);
      },
      function (cb) {
        cb(new Error(`error`));
      },
    ];

    parallelLimit(tasks, 2, (results) => {
      expect(results.slice(0, 3)).toEqual([1, 2, 3]);
      expect((results[3] as Error).message).toBe('error');
      done();
    });
  });

  it('empty task', (done) => {
    const tasks: ITask<any>[] = [];

    parallelLimit(tasks, 2, (results) => {
      expect(results).toEqual([]);
      done();
    });
  });

  it('async task use callback task', (done) => {
    const tasks: ITask<any>[] = [
      function (cb) {
        setTimeout(() => {
          cb(null, 1);
        }, 100);
      },
      function (cb) {
        setTimeout(() => {
          cb(null, 2);
        }, 100);
      },
      function (cb) {
        setTimeout(() => {
          cb(null, 3);
        }, 100);
      },
    ];

    parallelLimit(tasks, 2, (results) => {
      expect(results).toEqual([1, 2, 3]);
      done();
    });
  });

  it('async task use async/await task', (done) => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const create = (n: number) => {
      const workers = repeat(n, (index) => {
        return async function () {
          await delay(random.number(100, 300));
          return index + 1;
        };
      });

      const results = repeat(n, index => {
        return index + 1;
      });

      return {
        workers,
        results,
      };
    }
    
    const { workers, results } = create(10);

    const tasks: ITask<any>[] = workers;

    parallelLimit(tasks, 10, (results) => {
      expect(results).toEqual(results);
      done();
    });
  });

  it('async task use Promise-returned', (done) => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const tasks: ITask<any>[] = [
      async function () {
        await delay(100);
        return 1;
      },
      async function () {
        await delay(100);
        return 2;
      },
      async function () {
        await delay(100);
        return 3;
      },
    ];

    parallelLimit(tasks, 2)
      .then((results) => {
        expect(results).toEqual([1, 2, 3]);
        done();
      });
  });
});
