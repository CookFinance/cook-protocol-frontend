import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { SectionHeader } from "components";
import { transparentize } from "polished";
import React from "react";

import {
  AboutSection,
  HeaderSection,
  InvestmentHistorySection,
  MainSection,
  TokenDistributionSection,
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
    width: "63%",
    [theme.breakpoints.down("md")]: { width: "100%" },
  },
  right: {
    padding: 24,
    flex: 1,
    backgroundColor: transparentize(0.1, theme.colors.default),
    [theme.breakpoints.down("md")]: { width: "100%", flex: "unset" },
  },
  section: {
    marginBottom: 24,
  },
}));

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
        <SectionHeader title="About" />
        <AboutSection className={classes.section} />
        <SectionHeader title="Whitelist" />
        {/* <WhitelistSection className={classes.section} /> */}
      </div>
    </div>
  );
};

export default FundDetailsPage;
