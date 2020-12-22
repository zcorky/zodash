/**
 * Simple Dynamic Worker
 *  inspired by https://zhuanlan.zhihu.com/p/59981684
 */

export type IWorkerFn<D extends any[], R> = (...args: D) => Promise<R>;

export interface IWorker<D extends any[], R> {
  compile(): this;
  watch(): this;
  run: IWorkerFn<D, R>;
  stop(): Promise<void>;
}

export class WebWorker<D extends any[], R> implements IWorker<D, R> {
  private worker: Worker;
  private id = createIdGenerator();
  private tasks: Record<string, any> = {};

  /**
   * Create a function as a worker
   * 
   * @param fn raw function
   */
  public static create<D extends any[], R>(fn: IWorkerFn<D, R>) {
    const worker = new WebWorker(fn);

    worker
      .compile()
      .watch();

    return (...args: D) => {
      return worker.run(...args);
    };
  }

  constructor(public readonly fn: IWorkerFn<D, R>) {

  }

  public compile() {
    const script = createScript(this.fn);
    const blob = createBlob(script);
    const url = createUrl(blob);
    //
    this.worker = createWorker(url.url);

    return this;
  }

  public watch() {
    this.worker.onmessage = ({ data: { id, response, error } }) => {
      // @IGNORE not found task
      if (!this.hasTask(id)) return ;

      const { resolve, reject } = this.useTask(id);
      
      if (error) {
        const _error = new Error(error.message);
        _error.stack = error.stack;

        return reject(_error);
      }

      return resolve(response);
    };

    return this;
  }

  public run(...args: D): Promise<R> {
    return new Promise((resolve, reject) => {
      const id = this.id();

      this.registerTask(id, resolve, reject);

      this.worker.postMessage({
        id,
        request: args,
      });
    });
  }

  public async stop() {
    return this.worker.terminate();
  }

  //
  private registerTask(id: string, resolve: any, reject: any) {
    this.tasks[id] = {
      resolve,
      reject,
    };
  }

  private useTask(id: string) {
    const task = this.tasks[id];

    // task only comsume once
    delete this.tasks[id];

    return task;
  }

  private hasTask(id: string) {
    return id in this.tasks;
  }
}

export default WebWorker;

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
  let id = 0;
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

var aw = WebWorker.create(a);
aw(1111, 2).then(console.log);
*/