import { makeStyles } from "@material-ui/core";
import React from "react";
import useCommonStyles from "styles/common";

import { PoolHeroSection, PoolsSection } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const FundPage = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <div className={classes.root}>
      <PoolHeroSection />
      <div className={commonClasses.limitedContent}>
        <PoolsSection />
      </div>
    </div>
  );
};

export default FundPage;
