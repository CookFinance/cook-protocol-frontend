import { Divider, Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { transparentize } from "polished";
import React from "react";
import { IPoolDetails } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.colors.third}`,
    borderRadius: 8,
    padding: "3px 23px",
  },
  title: {
    fontSize: 20,
    color: theme.colors.reverse,
    fontWeight: 200,
    padding: "30px 0",
    lineHeight: "24px",
  },
  content: {
    padding: "40px 0",
  },
  divider: {
    backgroundColor: transparentize(0.7, theme.colors.reverse),
  },
  itemRow: {
    "& + &": {
      marginTop: 8,
    },
    fontSize: 14,
    lineHeight: "20px",
    display: "flex",
    alignItems: "center",
    "& div": {
      minWidth: 160,
      color: transparentize(0.7, theme.colors.reverse),
    },
    "& span": {
      fontSize: 14,
      lineHeight: "20px",
      flex: 1,
      color: theme.colors.reverse,
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
  data: IPoolDetails;
  className?: string;
}

export const FeaturedLiquidityPoolCard = (props: IProps) => {
  const classes = useStyles();
  const {
    data: { assetType, name, returns24h, tokens },
  } = props;

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography align="center" className={classes.title}>
        {name}
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
          <span>{5}</span>
        </div>
        <div className={classes.itemRow}>
          <div>Sector:</div>
          <span>{assetType}</span>
        </div>
      </div>
    </div>
  );
};
