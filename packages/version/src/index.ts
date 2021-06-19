import { execSync } from 'child_process';
import * as os from 'os';

export interface VersionInfo {
  version: string;
  // Git Commit
  gitCommitHash: string;
  gitCommitLongHash: string;
  gitCommitBranch: string;
  gitCommitAuthor: string;
  gitLastCommitMessage: string;
  gitCommitTime: string;

  // Build Info
  builtAt?: string;
  // Node Version
  nodeVersion: string;
  // OS Version
  osPlatform: string;
  osArch: string;

  // Runtime Info: Server | Browser
}

function exec(command: string) {
  return execSync(command).toString().trim();
}

export function versionSync(): VersionInfo {
  const version =
    process.env.npm_package_version ??
    'no version set in process.env.npm_package_version';

  const gitCommitHash = exec('git show -s --format=%h');
  const gitCommitLongHash = exec('git show -s --format=%H');
  const gitCommitBranch = exec('git rev-parse --abbrev-ref HEAD');
  const gitCommitAuthor = exec('git show -s --format=%an');
  const gitCommitTime = exec('git show -s --format=%cI');
  const gitLastCommitMessage = exec('git show -s --format=%B');

  const nodeVersion = process.version;
  const osPlatform = os.platform();
  const osArch = os.arch();

  return {
    version,
    gitCommitHash,
    gitCommitLongHash,
    gitCommitBranch,
    gitCommitAuthor,
    gitLastCommitMessage,
    gitCommitTime,
    //
    nodeVersion,
    osPlatform,
    osArch,
  };
}

export async function version(): Promise<VersionInfo> {
  return versionSync();
}

export default version;
