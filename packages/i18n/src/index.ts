import { get } from '@zodash/get';
import { format } from '@zodash/format';

export type Locale = string;
export type Translate = Record<string, any>;

export interface IOptions {
  locales: Record<Locale, Translate>;
  current?: string;
}

export class i18nConfig {
  private locales = {};

  private current: Locale = '';

  private get locale() {
    return this.locales?.[this.current] || {};
  }

  public config = (options: IOptions) => {
    this.locales = options.locales || {};
    this.current = options.current || Object.keys(this.locales)[0];
  };

  public setLocales = (locales: Record<Locale, Translate>) => {
    this.locales = locales;

    if (!this.current) {
      this.current = Object.keys(this.locales)[0];
    }
  };

  public setLocale = (currentLocale: string) => {
    this.current = currentLocale;
  };

  public translate = <T = void>(key: string, data?: T) => format(get(this.locale, key, key), data || {});

  public t = <T = void>(key: string, data?: T) => this.translate<T>(key, data);
}

export const i18n = new i18nConfig();

export const t = <T = void>(key: string, data?: T) => i18n.translate<T>(key, data);

export default i18n;
