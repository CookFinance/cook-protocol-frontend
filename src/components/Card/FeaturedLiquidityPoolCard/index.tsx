import { Divider, Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { transparentize } from "polished";
import React from "react";
import { IFeaturedLiquidityPool } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: 8,
    padding: "3px 23px",
    backgroundColor: theme.colors.primary,
    boxShadow: "0px 0px 4px 4px rgba(13, 21, 45, 0.5)",
  },
  title: {
    fontSize: 24,
    color: theme.colors.default,
    fontWeight: 200,
    padding: "30px 0",
    lineHeight: "32px",
  },
  content: {
    padding: "40px 0",
  },
  divider: {
    backgroundColor: transparentize(0.7, theme.colors.default),
  },
  itemRow: {
    "& + &": {
      marginTop: 24,
    },
    fontSize: 22,
    lineHeight: "29px",
    display: "flex",
    alignItems: "center",
    "& div": {
      minWidth: 160,
      color: transparentize(0.7, theme.colors.default),
    },
    "& span": {
      fontSize: 26,
      lineHeight: "34px",
      flex: 1,
      color: theme.colors.default,
      "&.positive": {
        color: theme.colors.success,
      },
      "&.negative": {
        color: theme.colors.warn,
      },
    },
  },
}));

interface IProps {
  data: IFeaturedLiquidityPool;
  className?: string;
}

export const FeaturedLiquidityPoolCard = (props: IProps) => {
  const classes = useStyles();
  const {
    data: { returns24h, riskIndex, sector, title },
  } = props;

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography align="center" className={classes.title}>
        {title}
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        <div className={classes.itemRow}>
          <div>Returns(24h):</div>
          <span
            className={
              returns24h > 0 ? "positive" : returns24h < 0 ? "negative" : ""
            }
          >
            {returns24h > 0 ? "+" : ""}
            {returns24h}%
          </span>
        </div>
        <div className={classes.itemRow}>
          <div>Risk Index:</div>
          <span>{riskIndex}</span>
        </div>
        <div className={classes.itemRow}>
          <div>Sector:</div>
          <span>{sector}</span>
        </div>
      </div>
    </div>
  );
};
