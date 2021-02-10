import { THEME } from "./enums";

export type Maybe<T> = T | null;

export interface ISettings {
  theme: THEME;
  responsiveFontSizes: boolean;
}

export interface INetwork {
  label: string;
  url: string;
  uniswapGraph: {
    httpUri: string;
    wsUri: string;
  };
  contracts: {};
  etherscanUri: string;
}

export type NetworkId = 1 | 42;

export interface IToken {
  address: string;
  decimals: number;
  symbol: string;
  image?: string;
}

export interface IFeaturedLiquidityPool {
  id: string;
  address: string;
  title: string;
  returns24h: number;
  riskIndex: string;
  sector: string;
}
