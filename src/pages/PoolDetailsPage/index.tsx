import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import useCommonStyles from "styles/common";

import {
  AboutSection,
  InvestmentHistorySection,
  MainSection,
  TokenDistributionSection,
  WhitelistSection,
} from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "51px 0",
  },
  title: {
    fontSize: 24,
    lineHeight: "31px",
    color: theme.colors.success,
  },
  content: {},
  section: {
    marginBottom: 100,
  },
}));

const PoolDetailsPage = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={clsx(classes.root, commonClasses.limitedContent)}>
      <Typography className={classes.title}>COOK 100</Typography>
      <div className={classes.content}>
        <MainSection className={classes.section} />
        <AboutSection className={classes.section} />
        <TokenDistributionSection className={classes.section} />
        <WhitelistSection className={classes.section} />
        <InvestmentHistorySection className={classes.section} />
      </div>
    </div>
  );
};

export default PoolDetailsPage;
