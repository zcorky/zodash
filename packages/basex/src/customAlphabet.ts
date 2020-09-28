export default function customAlphabet(alphabet: string | string[]) {
  const chars = Array.isArray(alphabet) ? alphabet : alphabet.split('');
  const radix = chars.length;

  return (num: number) => {
    const arr: string[] = [];
    let value = num;

    do {
      const { mod, divisor } = divide(value, radix);
      value = divisor;
      arr.unshift(chars[mod]);
    } while (value);

    return arr.join('');
  };
}

export function divide(divisor: number, radix: number) {
  const mod = divisor % radix;
  const _divisor = (divisor - mod) / radix;
  return {
    mod,
    divisor: _divisor,
  };
}