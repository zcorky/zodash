import { IBankData, IBankTypeData } from '../type';

/* eslint-disable-next-line */
const banksData: IBankData[] = require('./banks.json');
/* eslint-disable-next-line */
const bankTypesData: IBankTypeData[] = require('./bank-type.json');

export interface IData {
  loaded: boolean;
  banksDataMap: Map<string, IBankData>;
  bankTypesDataMap: Map<string, IBankTypeData>;
  banksRegExpMap: Map<RegExp, string>;
  banksRegExpMaybeMap: Map<RegExp, string>;
}

export class DataLoader {
  private data: IData = {
    loaded: false,
    banksDataMap: new Map(),
    bankTypesDataMap: new Map(),
    banksRegExpMap: new Map(),
    banksRegExpMaybeMap: new Map(),
  };

  public get banksDataMap() {
    return this.data.banksDataMap;
  }

  public get bankTypesDataMap() {
    return this.data.bankTypesDataMap;
  }

  public get banksRegExpMap() {
    return this.data.banksRegExpMap;
  }

  public get banksRegExpMaybeMap() {
    return this.data.banksRegExpMaybeMap;
  }

  public shouldLoad() {
    return !this.data.loaded;
  }

  public async load() {
    if (this.data.loaded) {
      return;
    }

    this.data.loaded = true;

    const {
      banksDataMap,
      bankTypesDataMap,
      banksRegExpMap,
      banksRegExpMaybeMap,
    } = this.data;

    banksData.forEach((bd) => {
      banksDataMap.set(bd.code, bd);

      bd.patterns.forEach((pattern) => {
        const code_type = bd.code + '#' + pattern.type;
        const fullRegExp = new RegExp(pattern.regex, 'g');
        const maybeRegExp = new RegExp(
          pattern.regex.replace(/\\d\{\d+\}\$/, ''),
          'g'
        );

        banksRegExpMap.set(fullRegExp, code_type);
        banksRegExpMaybeMap.set(maybeRegExp, code_type);
      });
    });

    bankTypesData.forEach((bd) => {
      bankTypesDataMap.set(bd.code, bd);
    });
  }

  public async lazyLoad() {
    if (this.shouldLoad()) {
      await this.load();
    }
  }
}

export default new DataLoader();
