import {
  IKnownTokenData,
  INetwork,
  IToken,
  KnownToken,
  NetworkId,
} from "types";
import { entries } from "utils/type-utils";

import { INFURA_PROJECT_ID } from "./constants";

export const networkIds = {
  MAINNET: 1,
  KOVAN: 42,
} as const;

export const tokenIds = {
  btc: "btc",
  eth: "eth",
  link: "link",
  xrp: "xrp",
  ltc: "ltc",
  dot: "dot",
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
  btc: {
    name: "Bitcoin",
    symbol: "btc",
    coingeckoId: "bitcoin",
  },
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
  };
};
