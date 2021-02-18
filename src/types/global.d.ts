import { BigNumber } from "ethers";
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
  coingeckoId: string;
  name: string;
}

export interface IFeaturedLiquidityPool {
  id: string;
  address: string;
  title: string;
  returns24h: number;
  riskIndex: string;
  sector: string;
}

export interface IPool {
  id: string;
  address: string;
  name: string;
  symbol: string;
  assetType: string;
  ckTokens: BigNumber;
  tokens: { [key: string]: BigNumber };
}

export interface ITokenDistribution {
  tokenName: string;
  quantity: number;
  value: number;
  portfolio: number;
  returns24h: number;
}

export type KnownToken = "btc" | "eth" | "link" | "xrp" | "ltc" | "dot";

export interface IKnownTokenData {
  name: string;
  symbol: string;
  coingeckoId: string;
}

export interface ICoinPrices {
  current: { [key in KnownToken]: BigNumber };
  prev: { [key in KnownToken]: BigNumber };
}
