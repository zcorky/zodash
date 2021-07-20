import { compose } from '@zodash/compose';
import { Emitter } from '@zodash/emitter';

import { Step, Progress, StepStatus } from './type';

export interface PipelineConfig {
  name: string;
}

export interface PipelineMiddleware {
  (ctx: PipelineContext, next: Function): void;
}

export interface PipelineProcessor<T> {
  (step: Step<T>, progress: Progress, ctx: PipelineContext): Promise<void>;
}

export interface PipelineContext {
  name: string;
  config: PipelineConfig;
  middlewares: PipelineMiddleware[];
  //
  steps: Step<any>[];
  progress: Progress;
}

export interface PipelineEvent {
  start(ctx: PipelineContext): void;
  prepareStart(ctx: PipelineContext): void;
  prepareFinish(ctx: PipelineContext): void;
  stepStart(step: Step<any>, progress: Progress): void;
  stepFinish(step?: Step<any>, progress?: Progress): void;
  finish(ctx: PipelineContext): void;
  error(error: Error, step?: Step<any>, progress?: Progress): void;
  fatal(error: Error): void;
  progress(progress: Progress, currentStep?: Step<any>): void;
}

export class Pipeline extends Emitter<PipelineEvent> {
  private ctx: PipelineContext;

  constructor(private readonly config: PipelineConfig) {
    super();

    this.ctx = this.createContext();

    this.use(async (ctx, next) => {
      const currentStep = this.getCurrentStep();
      const progress = this.getCurrentProgress();

      try {
        this.emit('stepStart', currentStep, progress);
        this.updateCurrentStepStatus('running');

        await next();
        this.emit('stepFinish', currentStep, progress);
        this.updateCurrentStepStatus('success');
      } catch (error) {
        this.emit('error', error, currentStep, progress);
        this.updateCurrentStepStatus('error');

        // pipeline should break
        throw error;
      }
    });
  }

  private createContext() {
    return {
      name: this.config.name,
      config: this.config,
      middlewares: [],
      steps: null,
      progress: null,
    };
  }

  private createHandler() {
    return compose(...(this.ctx.middlewares as any));
  }

  private setSteps(steps: Step<any>[]) {
    const { ctx } = this;
    ctx.steps = steps.map((step, index) => ({
      ...step,
      index,
      status: 'pending',
    }));

    this.resetProgress();
  }

  private resetProgress() {
    const { ctx } = this;
    ctx.progress = {
      total: ctx.steps.length,
      current: 0,
      percent: 0,
    };
  }

  private setCurrentStep(step: Step<any>) {
    const { ctx } = this;

    ctx.progress.current = step.index;
  }

  private setCurrentProgress() {
    const { ctx } = this;

    ctx.progress.percent = ~~(
      ((ctx.progress.current + 1) / ctx.progress.total) *
      100
    );
  }

  private getCurrentStep(): Step<any> {
    const { ctx } = this;

    return ctx.steps[ctx.progress.current];
  }

  private getCurrentProgress(): Progress {
    const { ctx } = this;
    return ctx.progress;
  }

  private updateCurrentStepStatus(status: StepStatus) {
    const step = this.getCurrentStep();
    step.status = status;
  }

  public get name() {
    return this.config.name;
  }

  public use(...middleware: PipelineMiddleware[]) {
    this.ctx.middlewares = this.ctx.middlewares.concat(middleware);
    return this;
  }

  public addProcessor(processor: PipelineProcessor<any>) {
    this.use(async (ctx, next) => {
      const currentStep = this.getCurrentStep();
      const progress = this.getCurrentProgress();

      await processor.apply(null, [currentStep, progress, ctx]);
      await next();
    });
  }

  public async run<T>(steps: Step<T>[]) {
    const { ctx } = this;

    try {
      this.emit('start', ctx);

      this.emit('prepareStart', ctx);

      const handler = this.createHandler();

      this.emit('prepareFinish', ctx);

      this.setSteps(steps);

      this.emit('progress', this.getCurrentProgress(), this.getCurrentStep());

      for (const step of ctx.steps) {
        this.setCurrentStep(step);

        // this.emit('progress', this.getCurrentProgress(), this.getCurrentStep());
        await handler.apply(this, [ctx]);

        this.setCurrentProgress();

        this.emit(
          'progress',
          this.getCurrentProgress(),
          this.getCurrentStep(),
        );
      }

      this.emit('finish', ctx);
    } catch (error) {
      this.emit('fatal', error);
    }
  }
}
