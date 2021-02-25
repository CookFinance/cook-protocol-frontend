import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import clsx from "clsx";
import { SectionHeader } from "components";
import React from "react";
import useCommonStyles from "styles/common";
import { ITokenDistribution } from "types";
import { numberWithCommas } from "utils";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    color: theme.colors.default,
    fontSize: 32,
    lineHeight: "42px",
  },
  content: { marginBottom: 20 },
  table: {
    "& table": {
      "& td": {
        textAlign: "center",
      },
      "& th": {
        textAlign: "center",
      },
    },
  },
}));

const mockTokenDistribution: ITokenDistribution[] = [
  {
    tokenName: "BTC",
    quantity: 110,
    value: 1664000,
    portfolio: 64,
    returns24h: 5,
  },
  {
    tokenName: "ETH",
    quantity: 700,
    value: 312000,
    portfolio: 12,
    returns24h: 10,
  },
  {
    tokenName: "XRP",
    quantity: 312000,
    value: 7800,
    portfolio: 3,
    returns24h: 15,
  },
  {
    tokenName: "LINK",
    quantity: 4333,
    value: 52000,
    portfolio: 2,
    returns24h: -2,
  },
  {
    tokenName: "LTC",
    quantity: 433,
    value: 26000,
    portfolio: 1,
    returns24h: -8,
  },
  {
    tokenName: "DOT",
    quantity: 4622,
    value: 20800,
    portfolio: 0.8,
    returns24h: 12,
  },
];

interface IProps {
  className?: string;
}

export const TokenDistributionSection = (props: IProps) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <SectionHeader title="Token Distribution" />
      <div className={classes.content}>
        <div className={clsx(commonClasses.table, classes.table)}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Portfolio %</TableCell>
                <TableCell>Return (24h)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTokenDistribution.map((distribution) => (
                <TableRow
                  className={
                    distribution.returns24h < 0 ? "negative" : "positive"
                  }
                  key={distribution.tokenName}
                >
                  <TableCell>{distribution.tokenName}</TableCell>
                  <TableCell>
                    {numberWithCommas(distribution.quantity)}
                  </TableCell>
                  <TableCell>${numberWithCommas(distribution.value)}</TableCell>
                  <TableCell>{distribution.portfolio}%</TableCell>
                  <TableCell>
                    <span>
                      {distribution.returns24h < 0 && <ArrowDropDownIcon />}
                      {distribution.returns24h >= 0 && <ArrowDropUpIcon />}
                      {distribution.returns24h}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
