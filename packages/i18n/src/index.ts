import { get } from '@zodash/get';

export type Language = string;
export type Translate = Record<string, any>;

export interface IOptions {
  locales: Record<Language, Translate>;
  language?: string;
}

export class i18nConfig {
  private locales = {};
  private language = '';

  constructor() {}

  private get locale() {
    return this.locales?.[this.language] || {};
  }
  
  public config = (options: IOptions) => {
    this.locales = options.locales || {};
    this.language = options.language || Object.keys(this.locales)[0];
  }

  public setLocales = (locales: Record<Language, Translate>) => {
    this.locales = locales;

    if (!this.language) {
      this.language = Object.keys(this.locales)[0];
    }
  }

  public setLanguage = (language: string) => {
    this.language = language;
  }
  
  public translate = (key: string) => {
    return get(this.locale, key, key);
  }

  public t = (key: string) => {
    return this.translate(key);
  }
}

export const i18n = new i18nConfig();

export const t = (key: string) => {
  return i18n.translate(key);
};

export default i18n;
