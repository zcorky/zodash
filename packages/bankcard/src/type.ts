export interface IBankData {
  name: string;
  code: string;
  patterns: IBankPattern[];
}

export interface IBankPattern {
  regex: string;
  type: IBankType;
}

export type IBankType = 'DC' | 'CC' | 'SCC' | 'PC';

export type IBankTypeData = {
  name: string;
  code: string;
};

export interface IBank {
  name: string;
  code: string;
  type: IBankTypeData;
}
