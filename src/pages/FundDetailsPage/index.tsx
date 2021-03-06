import { Button, Typography, makeStyles } from "@material-ui/core";
import { ReactComponent as PlusIcon } from "assets/svgs/plus.svg";
import clsx from "clsx";
import { BuySellModal, SectionHeader } from "components";
import { BigNumber } from "ethers";
import { transparentize } from "polished";
import React, { useState } from "react";
import { IPool } from "types";
import { AssetType } from "types/enums";

import {
  AboutSection,
  AddAssetModal,
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
  swapWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > div": {
      "&:first-child": {
        marginBottom: 0,
      },
    },
    marginBottom: 8,
  },
  swapButton: {
    height: 40,
    fontSize: 16,
    lineHeight: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    color: theme.colors.default,
    "& span": {
      textTransform: "none",
    },
    "&:hover": {
      color: theme.colors.secondary,
    },
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

interface IState {
  assetModalVisible: boolean;
  sellModalVisible: boolean;
  buyModalVisible: boolean;
}

const FundDetailsPage = () => {
  const classes = useStyles();
  const [state, setState] = useState<IState>({
    assetModalVisible: false,
    sellModalVisible: false,
    buyModalVisible: false,
  });

  const setAssetModalVisible = (assetModalVisible: boolean) =>
    setState((prev) => ({ ...prev, assetModalVisible }));

  const onNewAsset = () => {
    setAssetModalVisible(true);
  };

  const onBuy = () => {
    setState((prev) => ({ ...prev, buyModalVisible: true }));
  };

  const onSell = () => {
    setState((prev) => ({ ...prev, sellModalVisible: true }));
  };

  const onCloseSellBuyModal = () => {
    setState((prev) => ({
      ...prev,
      sellModalVisible: false,
      buyModalVisible: false,
    }));
  };

  return (
    <div className={clsx(classes.root)}>
      <div className={classes.left}>
        <HeaderSection onBuy={onBuy} onSell={onSell} />
        <MainSection className={classes.section} />
        <div className={classes.swapWrapper}>
          <SectionHeader title="Asset distribution" />
          <Button
            className={classes.swapButton}
            color="secondary"
            onClick={onNewAsset}
            variant="outlined"
          >
            <PlusIcon />
            &nbsp;&nbsp;
            <Typography>Add new asset</Typography>
          </Button>
        </div>

        <TokenDistributionSection className={classes.section} />
        <SectionHeader title="Investment History" />
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
      {state.assetModalVisible && (
        <AddAssetModal
          onClose={() => setAssetModalVisible(false)}
          visible={state.assetModalVisible}
        />
      )}
      {(state.buyModalVisible || state.sellModalVisible) && (
        <BuySellModal
          isSell={state.sellModalVisible}
          onClose={onCloseSellBuyModal}
          visible
        />
      )}
    </div>
  );
};

export default FundDetailsPage;
