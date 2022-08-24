// reference:
//  https://stackoverflow.com/questions/18638900/javascript-crc32
//  https://stackoverflow.com/questions/32940417/unsigned-crc-32-for-python-to-match-javas-crc-32

// export function unsigned(str: string) {
//   return signed(str) & 0xffffffff;
// }

function makeCRCTable() {
  let c: number;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
}

let T: any[];
export function crc32(str: string) {
  const crcTable = T || (T = makeCRCTable());
  let crc = 0 ^ -1;

  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xff];
  }

  return (crc ^ -1) >>> 0;
}

export const unsigned = crc32;
