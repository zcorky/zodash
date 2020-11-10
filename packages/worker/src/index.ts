/**
 * Simple Dynamic Worker
 *  inspired by https://zhuanlan.zhihu.com/p/59981684
 */

export type IWorkerFn<D extends any[], R> = (...args: D) => Promise<R>;

export interface IWorker<D extends any[], R> {
  run: IWorkerFn<D, R>;
}

export class WeWorker<D extends any[], R> implements IWorker<D, R> {
  private worker: Worker;
  private id = createIdGenerator();
  private tasks: Record<string, any> = {};

  public static create<D extends any[], R>(fn: IWorkerFn<D, R>) {
    const worker = new WeWorker(fn);

    worker.compile();

    worker.watch();

    return (...args: D) => {
      return worker.run(...args);
    };
  }

  constructor(public readonly fn: IWorkerFn<D, R>) {

  }

  compile() {
    const script = createScript(this.fn);
    const blob = createBlob(script);
    const url = createUrl(blob);
    this.worker = createWorker(url.url);
  }

  watch() {
    this.worker.onmessage = ({ data: { id, response, error } }) => {
      // @IGNORE not found task
      if (!this.tasks[id]) return ;

      const { resolve, reject } = this.tasks[id];
      // task only comsume once
      delete this.tasks[id];
      
      if (error) {
        const _error = new Error(error.message);
        _error.stack = error.stack;

        return reject(_error);
      }

      return resolve(response);
    };
  }

  register(id: string, resolve: any, reject: any) {
    this.tasks[id] = {
      resolve,
      reject,
    };
  }

  run(...args: D): Promise<R> {
    return new Promise((resolve, reject) => {
      const id = this.id();

      this.register(id, resolve, reject);

      this.worker.postMessage({
        id,
        request: args,
      });
    });
  }
}

export default WeWorker;

// utils

function createScript(fn: Function) {
  return `
var fn = ${fn.toString()};

self.onmessage = async ({ data }) => {
  const { id, request } = data;

  try {
    const response = await fn(...request);
  
    self.postMessage({
      id,
      response,
    });
  } catch (error) {
    self.postMessage({
      id,
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
};
  `;
}

function createBlob(text: string) {
  return new Blob(
    [text],
    { type: 'text/javascript' },
  );
}

function createUrl(data: Blob) {
  const url = URL.createObjectURL(data);

  return {
    url,
    revoke: () => URL.revokeObjectURL(url),
  };
}

function createWorker(url: string) {
  const worker = new Worker(url);

  return worker;
}

function createIdGenerator() {
  let id = 1;
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 4294967296;

  return () => {
    id = (id + 1) % MAX_SAFE_INTEGER;
    return 'task-' + id;
  };
}

/* Example
var a = async (x, y) => {
  return x + y;
}

var aw = WeWorker.create(a);
aw(1111, 2).then(console.log);
*/