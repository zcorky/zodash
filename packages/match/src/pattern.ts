export class MatchPattern<T, R = void> {
  private switches: {
    if: (data: T) => boolean;
    ok: (data: T) => R;
  }[] = [];
  private _fallback: (data: T) => R = (data) => {
    throw new Error(`unhandled data: ${JSON.stringify(data)}`);
  };

  public static create<T, R>() {
    return new MatchPattern<T, R>();
  }

  public with(_if: T | ((data: T) => boolean), ok: (data: T) => R) {
    if (typeof _if === 'function') {
      const fn = _if as (data: T) => boolean;
      return this.when(fn, ok);
    }

    const fn = (data: T) => data === _if;
    return this.when(fn, ok);
  }

  public fallback(fn: (data: T) => R) {
    this._fallback = fn;
    return this;
  }

  public when(_if: (data: T) => boolean, ok: (data: T) => R) {
    this.switches.push({ if: _if, ok });
    return this;
  }

  public match(data: T): R {
    for (const one of this.switches) {
      if (one.if.apply(null, [data])) {
        return one.ok.apply(null, [data]);
      }
    }

    return this._fallback.apply(null, [data]);
  }
}

export function createMatchPattern<T, R = void>() {
  return MatchPattern.create<T, R>();
}
