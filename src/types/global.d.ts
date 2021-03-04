import { BigNumber } from "ethers";
import { AssetType, ETransactionItemType, THEME } from "./enums";

export type Maybe<T> = T | null;

export interface ISettings {
  theme: THEME;
  responsiveFontSizes: boolean;
}

export interface INetwork {
  label: string;
  url: string;
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
  icon: React.ElementType;
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
  assetType: AssetType;
  ckTokens: BigNumber;
  tokens: { [key: string]: BigNumber };
}

export interface IPoolDetails extends IPool {
  returns24h: number;
  price: number;
  valuation: number;
}

export interface ITokenDistribution {
  tokenName: string;
  quantity: number;
  value: number;
  portfolio: number;
  returns24h: number;
}

export type KnownToken =
  | "eth"
  | "link"
  | "xrp"
  | "ltc"
  | "dot"
  | "uni"
  | "comp"
  | "bal"
  | "yfi"
  | "rep"
  | "dai"
  | "xlm"
  | "zrx"
  | "usdt";

export interface IKnownTokenData {
  name: string;
  symbol: string;
  coingeckoId: string;
}

export interface ICoinPrices {
  current: { [key in KnownToken]: BigNumber };
  prev: { [key in KnownToken]: BigNumber };
}

export interface ICreateFund {
  name: string;
  symbol: string;
  about: string;
  fee: number;
  acceptedTokens: string[];
  liquidityPoolType: string;
  platformWhitelist: string[];
  tokenWhitelist: string[];
  allowLeverage: string;
}

export interface IGlobalData {
  createdPools: ICreateFund[];
  tokenPrices: ICoinPrices;
  ethBalance: BigNumber;
  uniswapModalVisible: boolean;
}

export interface ITransactionItem {
  txId: string;
  type: ETransactionItemType;
  value: {
    token: KnownToken;
    amount: BigNumber;
  };
  timestamp: number;
}
