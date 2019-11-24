export function getUrl(usingClientTargetIfExist: boolean, path: string, target: string, clientTarget?: string): string {
  if (usingClientTargetIfExist && clientTarget) {
    return `${clientTarget}${path}`;
  }

  return `${target}${path}`;
}