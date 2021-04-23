import { IBankData, IBankTypeData } from '../type';

/* eslint-disable-next-line */
const banksData: IBankData[] = require('./banks.json');
/* eslint-disable-next-line */
const bankTypesData: IBankTypeData[] = require('./bank-type.json');

export interface IData {
  banksDataMap: Record<string, IBankData> | null;
  bankTypesDataMap: Record<string, IBankTypeData> | null;
  banksRegExpMap: Map<RegExp, string> | null;
}

export class DataLoader {
  private data = ({} as any) as IData;

  public get banksDataMap() {
    return this.data.banksDataMap;
  }

  public get bankTypesDataMap() {
    return this.data.bankTypesDataMap;
  }

  public get banksRegExpMap() {
    return this.data.banksRegExpMap;
  }

  public shouldLoad() {
    return !this.data.banksDataMap;
  }

  public async load() {
    this.data.banksDataMap = banksData.reduce((all, bd) => {
      all[bd.code] = bd;
      return all;
    }, {});

    this.data.bankTypesDataMap = bankTypesData.reduce((all, bd) => {
      all[bd.code] = bd;
      return all;
    }, {});

    this.data.banksRegExpMap = banksData.reduce((map, bd) => {
      bd.patterns.forEach((pattern) => {
        map.set(new RegExp(pattern.regex, 'g'), bd.code + '#' + pattern.type);
      });

      return map;
    }, new Map());
  }

  public async lazyLoad() {
    if (this.shouldLoad()) {
      await this.load();
    }
  }
}

export default new DataLoader();
