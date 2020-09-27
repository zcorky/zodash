export default function customAlphabet(alphabet: string | string[]) {
  const chars = Array.isArray(alphabet) ? alphabet : alphabet.split('');
  const radix = chars.length;

  return (num: number) => {
    const arr: string[] = [];
    let mod: number;
    let value = num;

    do {
      mod = value % radix;
      value = (value - mod) / radix;
      arr.unshift(chars[mod]);
    } while (value);

    return arr.join('');
  };
}
