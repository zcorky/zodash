import WebWorker, { IWorkerFn } from '@zodash/worker';

export function workerize<D extends any[], R>(fn: IWorkerFn<D, R>) {
  return WebWorker.create(fn);
}

export default workerize;
