import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import useCommonStyles from "styles/common";

import {
  FeaturedLiquidityPoolsSection,
  PoolsSection,
  TopSection,
} from "./components";

const useStyles = makeStyles((theme) => ({
  root: {},
  subTitle: {
    color: theme.colors.primary,
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
}));

const OverviewPage = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <div className={clsx(classes.root, commonClasses.pageContent)}>
      <TopSection />
      <Typography className={classes.subTitle}>Top Funds</Typography>
      <FeaturedLiquidityPoolsSection />
      <Typography className={classes.subTitle}>All Funds</Typography>
      <PoolsSection />
    </div>
  );
};

export default OverviewPage;
