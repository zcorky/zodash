import { TaskManager } from '../src/task-manager';
import { delay } from '@zcorky/delay';

// @TODO when using setImmediate in nextTick
//  will error: This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
global.setImmediate = undefined;

describe("@zodash/task-queue", () => {
  it('works', (done) => {
    const results = [];
    const taskManager = new TaskManager();
    
    taskManager.start();

    taskManager.add('task1', null, async () => {
      await delay(100);
      results.push(1);
    });

    taskManager.add('task3', null, async () => {
      await delay(200);
      results.push(3);
    });

    taskManager.add('task2', null, async () => {
      await delay(300);
      results.push(2);
      expect(results).toEqual([1, 3, 2]);
      done();
    });

    // setTimeout(() => {
    //   expect(results).toEqual([1, 3, 2]);
    //   done();
    // }, 1000);
  });
});
