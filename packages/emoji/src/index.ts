const actions = require('../data/actions.json');

export type Type =
  | 'feat'
  | 'fix'
  | 'chore'
  | 'test'
  | 'docs'
  | 'refactor'
  | 'perf'
  | 'ci'
  | 'revert';

export type Emoji = {
  type: string;
  description: string;
  emoji: string;
  code: string;
};

const _emojis = actions.reduce((all, one) => {
  all[one.type] = one;
  return all;
}, {} as Record<string, Emoji>);

export function list(): Emoji[] {
  return actions;
}

export function get(type: Type): Emoji | null {
  return _emojis[type] || null;
}

export function add(type: Type, emoji: Emoji) {
  _emojis[type] = emoji;
}
