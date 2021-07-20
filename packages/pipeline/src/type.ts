export type StepStatus = 'pending' | 'running' | 'success' | 'error';

export interface Step<T = any> {
  index?: number;
  name: string;
  payload: T;
  status?: StepStatus;
}

export interface Progress {
  total: number;
  current: number;
  percent: number;
}
