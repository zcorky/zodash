import { event } from '@zodash/dom';
import Cache from '@zodash/cache';

interface IExpectedKeyCode {
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  command: boolean;
  key: string;
}

interface IParsedKeycode {
  raw: string;
  parsed: IExpectedKeyCode;
  description: string;
}

type IRawKeycode =
  | string
  | {
      code: string;
      description: string;
    };

const keybindingCache = new Cache(10000);

export function parseKeycode(rawKeycode: IRawKeycode) {
  const code = typeof rawKeycode === 'string' ? rawKeycode : rawKeycode.code;
  const keycodes = code.split('+');

  return keycodes.reduce((all, key) => {
    switch (key) {
      case 'ctrl':
        all.ctrl = true;
        return all;
      case 'shift':
        all.shift = true;
        return all;
      case 'alt':
        all.alt = true;
        return all;
      case 'command':
        all.command = true;
        return all;
      default:
        all.key = key;
        return all;
    }
  }, {} as IExpectedKeyCode);
}

export function parseDescription(rawKeycode: IRawKeycode) {
  return typeof rawKeycode === 'string' ? null : rawKeycode.description;
}

export function isMatchedKeyCode(
  expected: IExpectedKeyCode,
  current: KeyboardEvent,
) {
  for (const _key in expected) {
    const key = _key as keyof IExpectedKeyCode;

    // @1 key not match
    if (
      key === 'key' &&
      expected.key.toLowerCase() !== current.key.toLowerCase()
    ) {
      return false;
    }

    // @2 ctrl not match
    if (key === 'ctrl' && !current.ctrlKey) {
      return false;
    }

    // @3 shift not match
    if (key === 'shift' && !current.shiftKey) {
      return false;
    }

    // @4 alt not match
    if (key === 'alt' && !current.altKey) {
      return false;
    }

    // @5 command not match
    if (key === 'command' && !current.metaKey) {
      return false;
    }
  }

  return true;
}

export function getInfo(
  raw: string,
  parsed: IExpectedKeyCode,
  description: string,
) {
  return { raw, parsed, description };
}

export function hotkeys(rawKeycode: string) {
  // @data
  const parsedKeycode = parseKeycode(rawKeycode);
  const description = parseDescription(rawKeycode);
  const info = getInfo(rawKeycode, parsedKeycode, description);

  // @cache hotkeys for management
  keybindingCache.set(rawKeycode, info);

  // @methods
  function isMatched(event: KeyboardEvent) {
    return isMatchedKeyCode(parsedKeycode, event);
  }

  function watch(
    target: Element | Window,
    handler: (event: KeyboardEvent, info: IParsedKeycode) => void,
  ) {
    const _handler = function (event: any) {
      if (!isMatched(event)) return false;

      handler.call(this, event, info);
    };

    event.on(target as any, 'keydown', _handler);

    return function unwatch() {
      event.off(target as any, 'keydown', _handler);
    };
  }

  return {
    /**
     * match keyboard event
     *
     * @param event keyboard event
     */
    isMatched,
    /**
     * watch element with hotkeys
     *
     * @param target target element or window
     * @param handler handler
     */
    watch,
    //
    get name() {
      return rawKeycode;
    },
    get code() {
      return rawKeycode;
    },
    get description() {
      return description;
    },
    get parsed() {
      return parsedKeycode;
    },
  };
}

hotkeys._cache = keybindingCache;

export default hotkeys;
