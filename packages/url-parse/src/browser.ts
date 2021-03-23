import { ParsedURL } from './type';

export function parse(url: string): ParsedURL {
  return (new URL(url) as unknown) as ParsedURL;
}
