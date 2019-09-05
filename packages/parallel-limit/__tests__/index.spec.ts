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

  it('async task', (done) => {
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
});
