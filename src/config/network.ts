import {
  IKnownTokenData,
  INetwork,
  IToken,
  KnownToken,
  NetworkId,
} from "types";
import { entries } from "utils/type-utils";

import { INFURA_PROJECT_ID, TOKEN_ICONS } from "./constants";

export const networkIds = {
  MAINNET: 1,
  KOVAN: 42,
} as const;

export const tokenIds = {
  eth: "eth",
  link: "link",
  xrp: "xrp",
  ltc: "ltc",
  dot: "dot",
  uni: "uni",
  comp: "comp",
  bal: "bal",
  yfi: "yfi",
  rep: "rep",
  dai: "dai",
  xlm: "xlm",
};

const networks: { [K in NetworkId]: INetwork } = {
  [networkIds.MAINNET]: {
    label: "Mainnet",
    url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    contracts: {},
    etherscanUri: "https://etherscan.io/",
  },
  [networkIds.KOVAN]: {
    label: "Kovan",
    url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
    contracts: {},
    etherscanUri: "https://kovan.etherscan.io/",
  },
};

const knownTokens: { [K in KnownToken]: IKnownTokenData } = {
  eth: {
    name: "Ethereum",
    symbol: "eth",
    coingeckoId: "ethereum",
  },
  link: {
    name: "Chainlink",
    symbol: "link",
    coingeckoId: "chainlink",
  },
  xrp: {
    name: "XRP",
    symbol: "xrp",
    coingeckoId: "ripple",
  },
  ltc: {
    name: "Litecoin",
    symbol: "ltc",
    coingeckoId: "litecoin",
  },
  dot: {
    name: "Polkadot",
    symbol: "dot",
    coingeckoId: "polkadot",
  },
  uni: {
    name: "Uniswap",
    symbol: "uni",
    coingeckoId: "uniswap",
  },
  comp: {
    name: "Compound Coin",
    symbol: "comp",
    coingeckoId: "compound-coin",
  },
  bal: {
    name: "Balancer",
    symbol: "bal",
    coingeckoId: "balancer",
  },
  yfi: {
    name: "yearn.finance",
    symbol: "yfi",
    coingeckoId: "yearn-finance",
  },
  rep: {
    name: "Augur",
    symbol: "rep",
    coingeckoId: "augur",
  },
  dai: {
    name: "Dai",
    symbol: "dai",
    coingeckoId: "dai",
  },
  xlm: {
    name: "Stellar",
    symbol: "xlm",
    coingeckoId: "stellar",
  },
  zrx: {
    name: "0x",
    symbol: "zrx",
    coingeckoId: "0x",
  },
};

export const supportedNetworkIds = Object.keys(networks).map(
  Number
) as NetworkId[];

export const supportedNetworkURLs = entries(networks).reduce<{
  [networkId: number]: string;
}>(
  (acc, [networkId, network]) => ({
    ...acc,
    [networkId]: network.url,
  }),
  {}
);

const validNetworkId = (networkId: number): networkId is NetworkId => {
  return networks[networkId as NetworkId] !== undefined;
};

export const getEtherscanUri = (networkId: number): string => {
  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }

  return networks[networkId].etherscanUri;
};

export const getToken = (tokenId: KnownToken): IToken => {
  const token = knownTokens[tokenId];
  if (!token) {
    throw new Error(`Unsupported token id: '${tokenId}'`);
  }
  return {
    name: token.name,
    symbol: token.symbol,
    coingeckoId: token.coingeckoId,
    decimals: 18,
    address: "",
    icon: TOKEN_ICONS[tokenId],
  };
};
