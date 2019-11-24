export function getTarget(usingClientTargetIfExist: boolean, target: string, clientTarget?: string) {
  return usingClientTargetIfExist && clientTarget ? clientTarget : target;
}