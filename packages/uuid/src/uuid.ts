export const UUID_V4_PATTERN = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

/**
 * UUID v4
 *
 * reference: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
export function v4() {
  return UUID_V4_PATTERN.replace(/[xy]/g, (substring: string) => {
    const random = (Math.random() * 16) | 0;
    const value = substring === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export const uuid = v4;
