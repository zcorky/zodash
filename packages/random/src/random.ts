/**
 * Produces a random number between the inclusive 0 and max bounds.
 * 
 * @param max the max bound. defaul min bound is 0.
 * @returns the random number between 0 and max
 */
export function random(max: number): number

/**
 * Produces a random number between the inclusive min and max bounds.
 * 
 * @param min the min bound
 * @param max the max bound
 * @returns the random number between min and max
 */
export function random(min: number, max: number): number
export function random(min?: number, max?: number) {
  if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }

  return ~~(Math.random() * (max - min)) + min;
}