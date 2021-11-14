export class MatchPattern<T, R = void> {
  private switches: {
    condition: (data: T) => boolean;
    ok: (data: T) => R;
  }[] = [];
  private _fallback: () => R = () => undefined as any;

  public static create<T, R>() {
    return new MatchPattern<T, R>();
  }

  public with(condition: (data: T) => boolean, ok: (data: T) => R) {
    this.switches.push({ condition, ok });
    return this;
  }

  public fallback(fn: () => R) {
    this._fallback = fn;
  }

  public match(data: T): R {
    for (const one of this.switches) {
      if (one.condition.apply(null, [data])) {
        return one.ok.apply(null, [data]);
      }
    }

    return this._fallback.apply(null);
  }
}

export function createMatchPattern<T, R = void>() {
  return MatchPattern.create<T, R>();
}
