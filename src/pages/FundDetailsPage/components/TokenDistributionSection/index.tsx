import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { SortableAssetDistributionTable } from "components";
import { TOKEN_DECIMALS } from "config/constants";
import { defaultCoinPrices, useGlobal } from "contexts";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import React, { useState } from "react";
import useCommonStyles from "styles/common";
import { IPool, ITokenDistributionTableItem, KnownToken } from "types";
import { AssetType } from "types/enums";
import { formatBigNumber } from "utils";
import { ZERO_NUMBER } from "utils/number";
import { calculateValuation } from "utils/token";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 20 },
  header: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
  },
  headerItem: {
    cursor: "pointer",
    userSelect: "none",
    fontSize: 14,
    lineHeight: 1.5,
    color: theme.colors.primary,
    marginRight: 40,
    transition: "all 0.5s",
    padding: "3px 0",
    borderBottom: `2px solid ${theme.colors.transparent}`,
    "&:hover": {
      opacity: 0.7,
    },
    "&.active": {
      fontWeight: "bold",
      borderBottom: `2px solid ${theme.colors.primary}`,
    },
  },
  content: {},
}));

enum ETab {
  All = "All",
  Yields = "Yields",
  Tokens = "Tokens",
}

const mockFundData: IPool = {
  id: "1",
  address: "123",
  name: "COOK 10",
  symbol: "COOK100",
  assetType: AssetType.SpotComposite,
  ckTokens: BigNumber.from("100000"),
  tokens: {
    eth: BigNumber.from("700"),
    xrp: BigNumber.from("312000"),
    link: BigNumber.from("4333"),
    ltc: BigNumber.from("433"),
    dot: BigNumber.from("4622"),
    uni: BigNumber.from("4622"),
  },
};
interface IProps {
  className?: string;
}
interface IState {
  tab: ETab;
}

export const TokenDistributionSection = (props: IProps) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { tokenPrices } = useGlobal();
  const [state, setState] = useState<IState>({ tab: ETab.All });

  const setTab = (tab: ETab) => setState((prev) => ({ ...prev, tab }));

  const pool = mockFundData;

  const mockDistributionItems: ITokenDistributionTableItem[] = [
    {
      tokenId: "ltc",
      quantity: parseEther("0.62"),
      portfolioAllocation: 8,
    },
    {
      tokenId: "dot",
      quantity: parseEther("1"),
      portfolioAllocation: 8,
    },
    {
      tokenId: "uni",
      quantity: parseEther("8.9"),
      portfolioAllocation: 8,
    },
    {
      tokenId: "eth",
      quantity: parseEther("62"),
      portfolioAllocation: 8,
    },
    {
      tokenId: "xrp",
      quantity: parseEther("22"),
      portfolioAllocation: 8,
    },
    {
      tokenId: "link",
      quantity: parseEther("35"),
      portfolioAllocation: 8,
    },
  ].map((item) => {
    const prices = tokenPrices.current;
    const curValuation = calculateValuation(prices, {
      [item.tokenId]: pool.tokens[item.tokenId],
    });

    prices[item.tokenId as KnownToken] =
      tokenPrices.prev[item.tokenId as KnownToken];
    const prevValuation = calculateValuation(prices, {
      [item.tokenId]: pool.tokens[item.tokenId],
    });

    const difference = curValuation
      .sub(prevValuation)
      .mul(BigNumber.from("1000"));

    const return24hBigNumber = prevValuation.isZero()
      ? ZERO_NUMBER
      : difference.div(prevValuation);

    const returns24hStr = (
      Number(formatBigNumber(return24hBigNumber, 0, 9)) / 1000
    ).toString();

    const value = item.quantity.mul(
      tokenPrices.current[item.tokenId as KnownToken]
    );

    const valueStr = (
      Number(formatBigNumber(value, TOKEN_DECIMALS + TOKEN_DECIMALS, 3)) / 1000
    ).toString();

    const quantityStr = (
      Number(formatBigNumber(item.quantity, TOKEN_DECIMALS, 3)) / 1000
    ).toString();

    return {
      ...item,
      returns24h: return24hBigNumber,
      value,
      portfolioAllocation: 20,
      tokenId: item.tokenId as KnownToken,
      returns24hStr,
      valueStr,
      quantityStr,
    };
  });

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.header}>
        {Object.values(ETab).map((tab) => (
          <span
            className={clsx(
              classes.headerItem,
              state.tab === tab ? "active" : ""
            )}
            key={tab}
            onClick={() => setTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className={classes.content}>
        <SortableAssetDistributionTable rows={mockDistributionItems} />
      </div>
    </div>
  );
};
