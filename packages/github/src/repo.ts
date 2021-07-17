import * as base64 from '@zodash/base64';
import { Core } from './core';

export class Repo {
  constructor(private readonly api: Core) {}

  public async getFile(owner: string, repo: string, path: string) {
    return this.api.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
    });
  }

  public async createFile(
    owner: string,
    repo: string,
    path: string,
    content: string,
    message = 'Create file with API',
  ) {
    return this.api.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      content: base64.encode(content),
      message,
    });
  }

  public async updateFile(
    owner: string,
    repo: string,
    path: string,
    content: string,
    message?: string,
  ) {
    return this.createFile(owner, repo, path, content, message);
  }

  public async deleteFile(
    owner: string,
    repo: string,
    path: string,
    sha: string,
    message = 'Create file with API',
  ) {
    return this.api.request('DELETE /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      sha,
      message,
    });
  }
}
