import { Octokit } from '@octokit/core';
import { OctokitOptions } from '@octokit/core/dist-types/types';

export type CoreOptions = OctokitOptions;

export class Core extends Octokit {
  constructor(options?: CoreOptions) {
    super(options);
  }
}
