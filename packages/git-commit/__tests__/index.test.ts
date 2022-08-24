import * as gcm from '../src';
import * as data from '../data/actions.json';

describe('@zodash/git-commit', () => {
  it('works', () => {
    expect(gcm.getMessage('feat', null, 'add a new feature')).toEqual(
      `feat: add a new feature`,
    );
    expect(gcm.getMessage('feat', 'client', 'add a new feature')).toEqual(
      `feat(client): add a new feature`,
    );
    expect(() =>
      gcm.getMessage('feax' as any, null, 'add a new feature'),
    ).toThrowError(/unknown commit type: feax/);
  });

  it('types', () => {
    expect(gcm.getMessage('feat', null, 'the message')).toEqual(
      `feat: the message`,
    );
    expect(gcm.getMessage('fix', null, 'the message')).toEqual(
      `fix: the message`,
    );
    expect(gcm.getMessage('chore', null, 'the message')).toEqual(
      `chore: the message`,
    );
    expect(gcm.getMessage('test', null, 'the message')).toEqual(
      `test: the message`,
    );
    expect(gcm.getMessage('docs', null, 'the message')).toEqual(
      `docs: the message`,
    );
    expect(gcm.getMessage('refactor', null, 'the message')).toEqual(
      `refactor: the message`,
    );
    expect(gcm.getMessage('perf', null, 'the message')).toEqual(
      `perf: the message`,
    );
    expect(gcm.getMessage('ci', null, 'the message')).toEqual(
      `ci: the message`,
    );
    expect(gcm.getMessage('revert', null, 'the message')).toEqual(
      `revert: the message`,
    );
    expect(() =>
      gcm.getMessage('perfx' as any, null, 'the message'),
    ).toThrowError('unknown commit type: perfx');
  });

  it('emoji', () => {
    data.forEach((one) => {
      expect(gcm.getActionEmoji(one.type as any)).toEqual(one.emoji);
    });

    expect(() => gcm.getActionEmoji('perfx' as any)).toThrowError(
      'unknown emoji for type: perfx',
    );
  });

  it('emoji.code', () => {
    data.forEach((one) => {
      expect(gcm.getActionEmojiCode(one.type as any)).toEqual(one.code);
      expect(
        gcm.getEmojiMessage(one.type as any, null, one.description),
      ).toEqual(`${one.code}: ${one.description}`);
      expect(
        gcm.getEmojiMessage(one.type as any, one.type, one.description),
      ).toEqual(`${one.code}(${one.type}): ${one.description}`);
    });

    expect(() => gcm.getActionEmojiCode('perfx' as any)).toThrowError(
      'unknown emoji(code) for type: perfx',
    );
  });

  it('action', () => {
    data.forEach((one) => {
      expect(gcm.getAction(one.type as any)).toEqual(one);
    });

    expect(gcm.getActions()).toEqual(data);
  });
});
