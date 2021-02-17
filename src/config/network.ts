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
    uniswapGraph: {
      httpUri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
      wsUri: "wss://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    },
    contracts: {},
    etherscanUri: "https://etherscan.io/",
  },
  [networkIds.KOVAN]: {
    label: "Kovan",
    url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
    uniswapGraph: {
      httpUri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
      wsUri: "wss://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    },
    contracts: {},
    etherscanUri: "https://kovan.etherscan.io/",
  },
};

const knownTokens: { [K in KnownToken]: IKnownTokenData } = {
  btc: {
    name: "Wrapped BTC",
    symbol: "WBTC",
    pairAddresses: {
      // wBTC - ETH
      [networkIds.MAINNET]: "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
      [networkIds.KOVAN]: "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
    },
  },
  eth: {
    name: "Ether (Wrapped)",
    symbol: "WETH",
    pairAddresses: {
      // USDC - ETH
      [networkIds.MAINNET]: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
      [networkIds.KOVAN]: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
    },
  },
  link: {
    name: "ChainLink Token",
    symbol: "LINK",
    pairAddresses: {
      // LINK - ETH
      [networkIds.MAINNET]: "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974",
      [networkIds.KOVAN]: "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974",
    },
  },
  xrp: {
    name: "XRP",
    symbol: "xrp",
    pairAddresses: {
      [networkIds.MAINNET]: "0x004375dff511095cc5a197a54140a24efef3a416",
      [networkIds.KOVAN]: "0x004375dff511095cc5a197a54140a24efef3a416",
    },
  },
  ltc: {
    name: "Litecoin",
    symbol: "LTC",
    pairAddresses: {
      [networkIds.MAINNET]: "0x004375dff511095cc5a197a54140a24efef3a416",
      [networkIds.KOVAN]: "0x004375dff511095cc5a197a54140a24efef3a416",
    },
  },
  dot: {
    name: "Polkadot",
    symbol: "DOT",
    pairAddresses: {
      [networkIds.MAINNET]: "0x004375dff511095cc5a197a54140a24efef3a416",
      [networkIds.KOVAN]: "0x004375dff511095cc5a197a54140a24efef3a416",
    },
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

export const getUniswapGraph = (
  networkId: number
): { httpUri: string; wsUri: string } => {
  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }

  return networks[networkId].uniswapGraph;
};

export const getToken = (networkId: number, tokenId: KnownToken): IToken => {
  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }
  const token = knownTokens[tokenId];
  if (!token) {
    throw new Error(`Unsupported token id: '${tokenId}'`);
  }
  return {
    name: token.name,
    symbol: token.symbol,
    pairAddress: token.pairAddresses[networkId],
    decimals: 18,
    address: "",
  };
};
