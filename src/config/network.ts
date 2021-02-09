import { INetwork, NetworkId } from "types";
import { entries } from "utils/type-utils";

import { INFURA_PROJECT_ID } from "./constants";

export const networkIds = {
  MAINNET: 1,
  KOVAN: 42,
} as const;

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
