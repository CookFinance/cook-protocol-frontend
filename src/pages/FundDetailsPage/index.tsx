import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { SectionHeader } from "components";
import { BigNumber } from "ethers";
import { transparentize } from "polished";
import React from "react";
import { IPool } from "types";
import { AssetType } from "types/enums";

import {
  AboutSection,
  AverageCostSection,
  HeaderSection,
  InvestmentHistorySection,
  MainSection,
  TokenDistributionSection,
  TotalAssetValueSection,
  WhitelistSection,
} from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  left: {
    padding: 24,
    flex: 1,
    [theme.breakpoints.down("md")]: { width: "100%", flex: "unset" },
  },
  right: {
    padding: 24,

    width: "35%",
    maxWidth: 440,
    backgroundColor: transparentize(0.1, theme.colors.default),
    [theme.breakpoints.down("md")]: { width: "100%" },
  },
  section: {
    marginBottom: 24,
  },
}));

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

const FundDetailsPage = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <div className={classes.left}>
        <HeaderSection />
        <MainSection className={classes.section} />
        <TokenDistributionSection className={classes.section} />
        <InvestmentHistorySection className={classes.section} />
      </div>
      <div className={classes.right}>
        <SectionHeader title="Total Asset Value" />
        <TotalAssetValueSection />
        <SectionHeader title="Average cost" />
        <AverageCostSection />
        <SectionHeader title="About" />
        <AboutSection className={classes.section} />
        <SectionHeader title="Whitelist" />
        <WhitelistSection className={classes.section} data={mockFundData} />
      </div>
    </div>
  );
};

export default FundDetailsPage;
