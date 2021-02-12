import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { SectionHeader } from "components";
import { transparentize } from "polished";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    padding: "22px 60px",
  },
  item: {
    padding: "28px 0",
    display: "flex",
    justifyContent: "space-between",
    "&:not(:first-child)": {
      borderTop: `1px solid ${transparentize(0.6, theme.colors.default)}`,
    },
  },
  itemDate: {
    color: transparentize(0.5, theme.colors.default),
    fontSize: 24,
    lineHeight: "32px",
  },
  itemContent: {
    minWidth: 350,
    color: theme.colors.default,
    fontSize: 24,
    lineHeight: "32px",
  },
}));

interface IProps {
  className?: string;
}

interface IInvestmentHistoryItem {
  date: string;
  content: string;
}

const mockInvestments: IInvestmentHistoryItem[] = [
  { date: "2020 November 15", content: "Bought 10 ETH" },
  { date: "2020 November 11", content: "Sold 1000 Chainlink" },
  { date: "2020 November 08", content: "Bought 25 BTC" },
];

export const InvestmentHistorySection = (props: IProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, props.className)}>
      <SectionHeader showMore title="Whitelist" />
      <div className={classes.content}>
        {mockInvestments.map((item) => (
          <div className={classes.item} key={item.date}>
            <div className={classes.itemDate}>{item.date}</div>
            <div className={classes.itemContent}>{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
