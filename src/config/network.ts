import {
  IKnownTokenData,
  INetwork,
  IToken,
  KnownContracts,
  KnownToken,
  NetworkId,
} from "types";
import { entries } from "utils/type-utils";

import { DEFAULT_NETWORK_ID, TOKEN_ICONS } from "./constants";

export const networkIds = {
  HTMAINNET: 128,
  HTTEST: 256,
} as const;

export const tokenIds = {
  btc: "btc",
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
  usdt: "usdt",
};

const networks: { [K in NetworkId]: INetwork } = {
  [networkIds.HTMAINNET]: {
    label: "HT-Mainnet",
    url: "https://http-mainnet.hecochain.com",
    contracts: {
      factory: "0x41aab7e0aae3ac4ee91e4e023441396c66a74eb2",
      controller: "0xa65db175e866c7560ca55f684464ad65cc71cf68",
    },
    etherscanUri: "https://scan.hecochain.com/",
  },
  [networkIds.HTTEST]: {
    label: "HT-Testnet",
    url: "https://http-testnet.hecochain.com",
    contracts: {
      factory: "0x41aab7e0aae3ac4ee91e4e023441396c66a74eb2",
      controller: "0xa65db175e866c7560ca55f684464ad65cc71cf68",
    },
    etherscanUri: "https://testnet.hecoinfo.com/",
  },
};

const knownTokens: { [K in KnownToken]: IKnownTokenData } = {
  btc: {
    name: "Bitcoin",
    symbol: "btc",
    coingeckoId: "bitcoin",
    addresses: {
      [networkIds.HTMAINNET]: "0x1D8684e6CdD65383AfFd3D5CF8263fCdA5001F13",
      [networkIds.HTTEST]: "0x1D8684e6CdD65383AfFd3D5CF8263fCdA5001F13",
    },
    image: "/assets/svgs/token/btc.svg",
    decimals: 18,
  },
  eth: {
    name: "Ethereum",
    symbol: "eth",
    coingeckoId: "ethereum",
    addresses: {
      [networkIds.HTMAINNET]: "0xfeB76Ae65c11B363Bd452afb4A7eC59925848656",
      [networkIds.HTTEST]: "0xfeB76Ae65c11B363Bd452afb4A7eC59925848656",
    },
    image: "/assets/svgs/token/eth.svg",
    decimals: 18,
  },
  link: {
    name: "Chainlink",
    symbol: "link",
    coingeckoId: "chainlink",
    addresses: {
      [networkIds.HTMAINNET]: "0x3E24e9d2c824B0ac2C82edc931B67252099B8e79",
      [networkIds.HTTEST]: "0x3E24e9d2c824B0ac2C82edc931B67252099B8e79",
    },
    image: "/assets/svgs/token/link.svg",
    decimals: 18,
  },
  xrp: {
    name: "XRP",
    symbol: "xrp",
    coingeckoId: "ripple",
    addresses: {
      [networkIds.HTMAINNET]: "0x69AB5c067370FfcF48f1678918A719B7e1f4B4AA",
      [networkIds.HTTEST]: "0x69AB5c067370FfcF48f1678918A719B7e1f4B4AA",
    },
    image: "/assets/svgs/token/xrp.svg",
    decimals: 18,
  },
  ltc: {
    name: "Litecoin",
    symbol: "ltc",
    coingeckoId: "litecoin",
    addresses: {
      [networkIds.HTMAINNET]: "0x326708a5C67c187725317ED89A1fb242B44e192a",
      [networkIds.HTTEST]: "0x326708a5C67c187725317ED89A1fb242B44e192a",
    },
    image: "/assets/svgs/token/ltc.svg",
    decimals: 18,
  },
  dot: {
    name: "Polkadot",
    symbol: "dot",
    coingeckoId: "polkadot",
    addresses: {
      [networkIds.HTMAINNET]: "0x97DE62E21D85c3D1A1bBF7E455C004096e51EcFc",
      [networkIds.HTTEST]: "0x97DE62E21D85c3D1A1bBF7E455C004096e51EcFc",
    },
    image: "/assets/svgs/token/dot.svg",
    decimals: 18,
  },
  uni: {
    name: "Uniswap",
    symbol: "uni",
    coingeckoId: "uniswap",
    addresses: {
      [networkIds.HTMAINNET]: "0x4d879F43f6644784248553Ee91A2e4Dfb06fE0BC",
      [networkIds.HTTEST]: "0x4d879F43f6644784248553Ee91A2e4Dfb06fE0BC",
    },
    image: "/assets/svgs/token/uni.svg",
    decimals: 18,
  },
  comp: {
    name: "Compound Coin",
    symbol: "comp",
    coingeckoId: "compound-coin",
    addresses: {
      [networkIds.HTMAINNET]: "0xd948d1017b81d3497fba3f6f44135d7afe6edfeb",
      [networkIds.HTTEST]: "0xd948d1017b81d3497fba3f6f44135d7afe6edfeb",
    },
    image: "/assets/svgs/token/comp.svg",
    decimals: 18,
  },
  bal: {
    name: "Balancer",
    symbol: "bal",
    coingeckoId: "balancer",
    addresses: {
      [networkIds.HTMAINNET]: "0xEaaB9DbB37e2149a8205e67783819c7FBEd7087f",
      [networkIds.HTTEST]: "0xEaaB9DbB37e2149a8205e67783819c7FBEd7087f",
    },
    image: "/assets/svgs/token/bal.svg",
    decimals: 18,
  },
  yfi: {
    name: "yearn.finance",
    symbol: "yfi",
    coingeckoId: "yearn-finance",
    addresses: {
      [networkIds.HTMAINNET]: "0x48B284700Ff525D2cE32eb1F8Fb449D780305883",
      [networkIds.HTTEST]: "0x48B284700Ff525D2cE32eb1F8Fb449D780305883",
    },
    image: "/assets/svgs/token/bal.svg",
    decimals: 18,
  },
  rep: {
    name: "Augur",
    symbol: "rep",
    coingeckoId: "augur",
    addresses: {
      [networkIds.HTMAINNET]: "0x9d4c69aE56002a152e428A216A406d63d207f6b2",
      [networkIds.HTTEST]: "0x9d4c69aE56002a152e428A216A406d63d207f6b2",
    },
    image: "/assets/svgs/token/rep.svg",
    decimals: 18,
  },
  dai: {
    name: "Dai",
    symbol: "dai",
    coingeckoId: "dai",
    addresses: {
      [networkIds.HTMAINNET]: "0x60d64Ef311a4F0E288120543A14e7f90E76304c6",
      [networkIds.HTTEST]: "0x60d64Ef311a4F0E288120543A14e7f90E76304c6",
    },
    image: "/assets/svgs/token/dai.svg",
    decimals: 18,
  },
  xlm: {
    name: "Stellar",
    symbol: "xlm",
    coingeckoId: "stellar",
    addresses: {
      [networkIds.HTMAINNET]: "0xaD941373782E3162a9EE661FB859E64Cc559FA9c",
      [networkIds.HTTEST]: "0xaD941373782E3162a9EE661FB859E64Cc559FA9c",
    },
    image: "/assets/svgs/token/xlm.svg",
    decimals: 18,
  },
  zrx: {
    name: "0x",
    symbol: "zrx",
    coingeckoId: "0x",
    addresses: {
      [networkIds.HTMAINNET]: "0x5000F1595491A4C2F6946d3976f0B9e3D3c3Da77",
      [networkIds.HTTEST]: "0x5000F1595491A4C2F6946d3976f0B9e3D3c3Da77",
    },
    image: "/assets/svgs/token/zrx.svg",
    decimals: 18,
  },
  usdt: {
    name: "Tether",
    symbol: "usdt",
    coingeckoId: "tether",
    addresses: {
      [networkIds.HTMAINNET]: "0x04F535663110A392A6504839BEeD34E019FdB4E0",
      [networkIds.HTTEST]: "0x04F535663110A392A6504839BEeD34E019FdB4E0",
    },
    image: "/assets/svgs/token/usdt.svg",
    decimals: 18,
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

export const getEtherscanUri = (networkId?: number): string => {
  const fNetworkId = networkId || DEFAULT_NETWORK_ID;
  if (!validNetworkId(fNetworkId)) {
    throw new Error(`Unsupported network id: '${fNetworkId}'`);
  }

  return networks[fNetworkId].etherscanUri;
};

export const getToken = (tokenId: KnownToken, networkId?: number): IToken => {
  const token = knownTokens[tokenId];

  if (!token) {
    throw new Error(`Unsupported token id: '${tokenId}'`);
  }
  const fNetworkId = networkId || DEFAULT_NETWORK_ID;
  if (!validNetworkId(fNetworkId)) {
    throw new Error(`Unsupported network id: '${fNetworkId}'`);
  }
  return {
    name: token.name,
    symbol: token.symbol,
    coingeckoId: token.coingeckoId,
    decimals: token.decimals,
    address: token.addresses[fNetworkId],
    icon: TOKEN_ICONS[tokenId],
  };
};

export const getContractAddress = (
  networkId: number,
  contract: KnownContracts
): string => {
  if (!validNetworkId(networkId)) {
    throw new Error(`Unsupported network id: '${networkId}'`);
  }
  return networks[networkId].contracts[contract];
};
