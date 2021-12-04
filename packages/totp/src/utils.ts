const CONSTANTS = {
  TIME_STEP: 30,
  STARTED_AT: 0,
};

export function getTimeCounter(
  timeStep = CONSTANTS.TIME_STEP,
  startedAt = CONSTANTS.STARTED_AT,
  nowSeconds = Date.now(),
) {
  return Math.floor((nowSeconds / 1000 - startedAt) / timeStep);
}

export function getTTL(
  timeStep = CONSTANTS.TIME_STEP,
  startedAt = CONSTANTS.STARTED_AT,
) {
  const now = Date.now();
  return timeStep - (Math.floor(now / 1000 - startedAt) % timeStep);
}
