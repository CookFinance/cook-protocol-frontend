import { makeStyles } from "@material-ui/core";
import React from "react";
import useCommonStyles from "styles/common";

import {
  FeaturedLiquidityPoolsSection,
  PoolHeroSection,
  PoolsSection,
} from "./components";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const PoolPage = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <div className={classes.root}>
      <PoolHeroSection />
      <div className={commonClasses.limitedContent}>
        <FeaturedLiquidityPoolsSection />
        <PoolsSection />
      </div>
    </div>
  );
};

export default PoolPage;
