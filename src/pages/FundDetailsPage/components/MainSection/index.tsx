import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { PoolChart, PoolDetailsContentPanel, Tradebox } from "components";
import { transparentize } from "polished";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {},
  right: {},
  leftBottom: {
    display: "flex",
    marginTop: 50,
  },
  leftBottomItem: { flex: 1, "& + &": { marginLeft: 50 } },
  title: {
    color: theme.colors.default,
    fontSize: 32,
    lineHeight: "42px",
  },
  leftTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  leftTopRight: {
    display: "flex",
    "& > span": {
      marginRight: 24,
      fontSize: 20,
      lineHeight: "26px",
      "&:first-child": {
        color: theme.colors.warn,
      },
      "&:last-child": {
        color: transparentize(0.5, theme.colors.default),
      },
    },
  },
  leftMidddle: {
    marginTop: 22,
  },
}));

interface IProps {
  className?: string;
}

export const MainSection = (props: IProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.left}>
        <div className={classes.leftTop}>
          <Typography className={classes.title}>$625</Typography>
          <div className={classes.leftTopRight}>
            <span>+8.7%</span>
            <span>Today</span>
          </div>
        </div>
        <div className={classes.leftMidddle}>
          <PoolChart />
        </div>
        <div className={classes.leftBottom}>
          <PoolDetailsContentPanel
            className={classes.leftBottomItem}
            data={{
              title: "Total Asset Value",
              value: "$1,250",
              details: [
                { comment: "Total Cost", value: "$1,000" },
                { comment: "Total Returns", value: "$250（+25%)" },
              ],
            }}
          />
          <PoolDetailsContentPanel
            className={classes.leftBottomItem}
            data={{
              title: "Average Cost",
              value: "$500",
              details: [
                { comment: "Shares", value: "2" },
                { comment: "Portfolio Diversity", value: "20%" },
              ],
            }}
          />
        </div>
      </div>
      <div className={classes.right}>
        <Tradebox />
      </div>
    </div>
  );
};
