import customAlphabet from './customAlphabet';

// @raw
// export default function binary(num: number): string {
//   const arr = [];
//   const radix = 2;
//   let mod: number;
//   let value = num;

//   do {
//     mod = value % radix;
//     value = (value - mod) / radix;
//     arr.unshift(mod);
//   } while (value);

//   return arr.join('');
// }

const fn = customAlphabet('01');

export default function binary(num: number) {
  return fn(num);
}