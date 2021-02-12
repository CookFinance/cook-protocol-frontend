import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { SectionHeader } from "components";
import { transparentize } from "polished";
import React from "react";
import { numberWithCommas } from "utils";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    marginTop: 20,
    padding: "50px 60px",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  description: {
    fontSize: 24,
    lineHeight: "32px",
    color: theme.colors.default,
  },
  top: {
    marginTop: 38,
    marginBottom: 45,
    "& > * + *": {
      marginTop: 16,
    },
  },
  bottom: {
    marginTop: 16,
    display: "flex",
    alignItems: "center",
  },
  bottomItem: {
    paddingRight: 80,
    paddingLeft: 80,
    borderRight: `1px solid ${transparentize(0.6, theme.colors.default)}`,
    "&:last-child": { paddingRight: 0, borderRight: "none" },
    "&:first-child": { paddingLeft: 0 },
    "& > * + *": {
      marginTop: 16,
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    "& span": {
      "&:first-child": {
        fontSize: 24,
        lineHeight: "32px",
        color: transparentize(0.5, theme.colors.default),
        width: 300,
      },
      "&:last-child": {
        color: theme.colors.default,
        fontSize: 30,
        lineHeight: "40px",
      },
    },
    "&.bold": {
      "& span": {
        "&:last-child": {
          fontWeight: "bold",
        },
      },
    },
  },
}));

interface IProps {
  className?: string;
}

export const AboutSection = (props: IProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, props.className)}>
      <SectionHeader title="About" />
      <div className={classes.content}>
        <Typography className={classes.description}>
          Liquidity Pool managed by Cook Protocol. It is an index of the top 100
          tokens to seek for high returns consistently.
        </Typography>
        <div className={classes.top}>
          <div className={classes.item}>
            <span>Fees:</span>
            <span>0.5%</span>
          </div>
          <div className={classes.item}>
            <span>Accepted Tokens:</span>
            <span>ETH, DAI</span>
          </div>
        </div>
        <div className={clsx(classes.item, "bold")}>
          <span>Total Value:</span>
          <span>${numberWithCommas("2600000")}</span>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottomItem}>
            <div className={clsx(classes.item, "bold")}>
              <span>Price:</span>
              <span>${numberWithCommas("625")}</span>
            </div>
            <div className={clsx(classes.item, "bold")}>
              <span>Highest Price(52 weeks):</span>
              <span>${numberWithCommas("635")}</span>
            </div>
          </div>
          <div className={classes.bottomItem}>
            <div className={clsx(classes.item, "bold")}>
              <span>Trade Volume(24h):</span>
              <span>${numberWithCommas("500000")}</span>
            </div>
            <div className={clsx(classes.item, "bold")}>
              <span>Lowest Price(52 weeks):</span>
              <span>${numberWithCommas("495")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
