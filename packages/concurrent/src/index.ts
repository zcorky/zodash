import { parallelLimit, ITask, Done } from '@zodash/parallel-limit';

export function concurrent<R>(
  tasks: ITask<R>[],
  limit: number,
  cb?: Done<R>,
) {
  return parallelLimit(tasks, limit, cb);
}
