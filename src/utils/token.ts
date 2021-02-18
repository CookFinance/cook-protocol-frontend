import axios from "axios";
import { getToken, tokenIds } from "config/network";
import { BigNumber, utils } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ICoinPrices, KnownToken } from "types";

import { ZERO_NUMBER } from "./number";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function getImageUrl(tokenAddress?: string): string | undefined {
  if (!tokenAddress) return undefined;
  tokenAddress = utils.getAddress(tokenAddress);
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`;
}

export const getCoinsPrices = async (): Promise<ICoinPrices> => {
  const prices: ICoinPrices = {
    current: {
      eth: ZERO_NUMBER,
      btc: ZERO_NUMBER,
      link: ZERO_NUMBER,
      xrp: ZERO_NUMBER,
      ltc: ZERO_NUMBER,
      dot: ZERO_NUMBER,
    },
    prev: {
      eth: ZERO_NUMBER,
      btc: ZERO_NUMBER,
      link: ZERO_NUMBER,
      xrp: ZERO_NUMBER,
      ltc: ZERO_NUMBER,
      dot: ZERO_NUMBER,
    },
  };

  const promises = Object.keys(tokenIds).map(async (tokenId) => {
    const token = getToken(tokenId as KnownToken);
    const tokenPrices = await getCoinPrices(token.coingeckoId);
    prices.current[tokenId as KnownToken] = tokenPrices.current;
    prices.prev[tokenId as KnownToken] = tokenPrices.prev;
  });

  await Promise.all(promises);

  return prices;
};

export const getCoinPrices = async (
  coingeckoId: string
): Promise<{ current: BigNumber; prev: BigNumber }> => {
  const endPoint = `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=2&interval=daily`;
  const response = await axios.get(endPoint);
  const { prices } = response.data;
  if (prices.length === 0) {
    return { current: ZERO_NUMBER, prev: ZERO_NUMBER };
  }

  const currentPrice = prices[prices.length - 1][1];
  const prevPrice = prices[0][1];
  return {
    current: parseEther(String(currentPrice)),
    prev: parseEther(String(prevPrice)),
  };
};

export const calculateValuation = (
  prices: { [key in KnownToken]: BigNumber },
  tokens: { [key: string]: BigNumber }
): BigNumber => {
  let total = ZERO_NUMBER;

  Object.keys(tokens).map((tokenId) => {
    const price = prices[tokenId as KnownToken];
    const amount = tokens[tokenId];

    total = total.add(price.mul(amount));
  });

  return total;
};
