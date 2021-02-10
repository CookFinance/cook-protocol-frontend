import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import useCommonStyles from "styles/common";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: -Number(theme.custom.appHeaderHeight),
    paddingTop: theme.custom.appHeaderHeight,
    backgroundImage: "url(/assets/imgs/hero.png)",
    backgroundSize: "cover",
  },
  content: {
    paddingBottom: 230,
    paddingTop: 162,
  },
  title: {
    fontSize: 60,
    color: theme.colors.default,
    fontWeight: "bold",
  },
  description: { fontSize: 48, color: theme.colors.default, marginTop: 20 },
}));

export const PoolHeroSection = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.root}>
      <div className={clsx(classes.content, commonClasses.limitedContent)}>
        <Typography align="center" className={classes.title}>
          Cook Protocol
        </Typography>
        <Typography align="center" className={classes.description}>
          Decentralized Asset Management Platform
        </Typography>
      </div>
    </div>
  );
};
