import { Divider, Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { FundChart } from "components/Chart";
import { DEFAULT_NETWORK_ID } from "config/constants";
import { getToken } from "config/network";
import { useConnectedWeb3Context } from "contexts";
import { transparentize } from "polished";
import React from "react";
import { IPoolDetails, KnownToken } from "types";

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
  itemRow: {
    "& + &": {
      marginTop: 8,
    },
    fontSize: 14,
    lineHeight: "20px",
    display: "flex",
    alignItems: "center",
    "& div": {
      flex: 1,
      color: theme.colors.secondary,
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
  assets: {
    display: "flex",
    alignItems: "center",
    "& span": {
      flex: "unset",
    },
  },
  icon: {
    width: 16,
    height: 16,
    color: "unset !important",
    display: "inline-block !important",
    padding: "0 !important",
    "& svg": {
      width: 16,
      height: 16,
    },
    marginRight: 3,
  },
}));

interface IProps {
  data: IPoolDetails;
  className?: string;
}

export const FeaturedLiquidityPoolCard = (props: IProps) => {
  const classes = useStyles();
  const { networkId } = useConnectedWeb3Context();
  const {
    data: { assetType, name, returns24h, tokens },
  } = props;
  const moreAssets = Object.keys(tokens).length - 4;

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography align="center" className={classes.title}>
        {name}
      </Typography>
      <FundChart data={props.data} />
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
        <div className={classes.itemRow}>
          <div>Assets:</div>
          <span className={classes.assets}>
            {Object.keys(tokens)
              .slice(0, 4)
              .map((key) => {
                const token = getToken(
                  key as KnownToken,
                  networkId || DEFAULT_NETWORK_ID
                );
                const { icon: Icon } = token;
                return (
                  <span className={classes.icon} key={token.name}>
                    <Icon />
                  </span>
                );
              })}
            {moreAssets > 0 && (
              <span className="more-assets">+{moreAssets}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
