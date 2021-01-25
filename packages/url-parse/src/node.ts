import { ParsedURL } from './type';
import { NAMED } from './constants';

export function parse(url: string): ParsedURL | null {
  return NAMED.exec(url)?.groups as unknown as ParsedURL ?? null;
}