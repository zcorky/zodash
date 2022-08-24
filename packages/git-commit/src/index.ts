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

export type Action = {
  type: string;
  description: string;
  emoji: string;
  code: string;
};

const _actions = actions.reduce((all, one) => {
  all[one.type] = one;
  return all;
}, {} as Record<string, Action>);

export function getActions(): Action[] {
  return actions;
}

export function getAction(type: Type): Action | null {
  return _actions[type] || null;
}

export function getActionEmoji(type: Type) {
  const action = getAction(type);
  if (!action?.emoji) {
    throw new Error(`unknown emoji for type: ${type}`);
  }

  return action?.emoji;
}

export function getActionEmojiCode(type: Type) {
  const action = getAction(type);
  if (!action?.code) {
    throw new Error(`unknown emoji(code) for type: ${type}`);
  }

  return action?.code;
}

export function getMessage(
  type: Type,
  scope: string | null,
  subject: string,
) {
  if (!getAction(type)) {
    throw new Error(`unknown commit type: ${type}`);
  }

  if (!scope) {
    return `${type}: ${subject}`;
  }

  return `${type}(${scope}): ${subject}`;
}

export function getEmojiMessage(
  type: Type,
  scope: string | null,
  subject: string,
) {
  const emojiCode = getActionEmojiCode(type);

  if (!scope) {
    return `${emojiCode}: ${subject}`;
  }

  return `${emojiCode}(${scope}): ${subject}`;
}
