import { Pipeline, Progress, Step } from '../src';

describe('@zodash/pipeline', () => {
  it('works', async () => {
    let count = 0;

    const pipeline = new Pipeline({ name: '前端发布流水线' });
    pipeline.addProcessor(async (step) => {
      count += 1;
      console.log('处理：', step.payload.label);
    });

    pipeline.on('progress', (progress, step) => {
      console.log(
        `当前进度：${progress.percent}%，最新步骤: ${step.payload.label}(${step.status})`,
      );
    });

    const steps: Step<{ label: string }>[] = [
      { name: 'checkout', payload: { label: '代码检出' } },
      { name: 'lint', payload: { label: '代码检查' } },
      { name: 'test', payload: { label: '代码测试' } },
      { name: 'build', payload: { label: '代码构建' } },
      { name: 'deploy', payload: { label: '代码部署' } },
      { name: 'healthcheck', payload: { label: '健康检查' } },
    ];

    await pipeline.run(steps);

    expect(count).toEqual(steps.length);
  });

  it('error', async () => {
    let count = 0;
    let errorMessage: string;
    let errorStep: Step;
    let errorProgress: Progress;

    const pipeline = new Pipeline({ name: '前端发布流水线' });
    pipeline.addProcessor(async (step) => {
      count += 1;

      if (step.index + 1 === 3) {
        throw new Error('缺少必要数据');
      }
    });

    pipeline.on('error', (error, step, progress) => {
      errorMessage = error.message;
      errorStep = step;
      errorProgress = progress;
    });

    pipeline.on('progress', (progress, step) => {
      console.log(
        `当前进度：${progress.percent}%，最新步骤: ${step.payload.label}(${step.status})`,
      );
    });

    const steps: Step<{ label: string }>[] = [
      { name: 'checkout', payload: { label: '代码检出' } },
      { name: 'lint', payload: { label: '代码检查' } },
      { name: 'test', payload: { label: '代码测试' } },
      { name: 'build', payload: { label: '代码构建' } },
      { name: 'deploy', payload: { label: '代码部署' } },
      { name: 'healthcheck', payload: { label: '健康检查' } },
    ];

    await pipeline.run(steps);

    expect(count).toEqual(3);
    expect(errorStep.index).toEqual(2);
    expect(errorStep.name).toEqual('test');
    expect(errorStep.status).toEqual('error');
    expect(errorProgress.total).toEqual(steps.length);
    expect(errorProgress.current).toEqual(2);
    expect(errorProgress.percent).toEqual(33);
    expect(errorMessage).toEqual('缺少必要数据');
  });
});
