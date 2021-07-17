import { Core, CoreOptions } from './core';
import { Repo } from './repo';

export interface GitHubAPIOptions extends CoreOptions {
  version?: string;
}

export class GitHubAPI {
  public api = new Core(this.options);
  public repo = new Repo(this.api);

  constructor(private readonly options: GitHubAPIOptions) {}
}

export default GitHubAPI;
