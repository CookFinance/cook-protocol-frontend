import { makeStyles } from "@material-ui/core";
import React from "react";
import useCommonStyles from "styles/common";

import { FeaturedLiquidityPoolsSection, PoolHeroSection } from "./components";

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
      </div>
    </div>
  );
};

export default PoolPage;
