import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useCommonStyles from "styles/common";
import { IPool } from "types";
import { numberWithCommas } from "utils";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 120,
  },
  filter: {
    display: "flex",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 30,
    fontWeight: 700,
    color: theme.colors.default,
    marginRight: 50,
  },
  filterControl: {
    "& + &": {
      marginLeft: 60,
    },
  },
  filterSelect: {
    minWidth: 140,
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    backgroundColor: theme.colors.primary,
    border: "none !important",
  },
  filterSelectLabel: { color: `${theme.colors.default} !important` },
  content: {
    marginTop: 60,
  },
}));

const mockPools: IPool[] = [
  {
    id: "1",
    address: "123",
    name: "COOK 10",
    symbol: "COOK100",
    price: 625,
    returns24h: 25,
    valuation: 2600000,
    assetType: "Spot - Composite",
  },
  {
    id: "12",
    address: "1233",
    name: "Liquidity Pool",
    symbol: "DSC",
    price: 150,
    returns24h: -2,
    valuation: 12500000,
    assetType: "Smart Contract",
  },
  {
    id: "13",
    address: "1234",
    name: "DeFi Liquidity Pool",
    symbol: "DEFILEND",
    price: 120,
    returns24h: 15,
    valuation: 15500000,
    assetType: "Lending, Stablecoins",
  },
];

interface IState {
  filter: {
    type: string;
    platform: string;
    token: string;
  };
}

export const PoolsSection = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const history = useHistory();

  const [state, setState] = useState<IState>({
    filter: { type: "", platform: "", token: "" },
  });

  const onChangeFilter = (key: string) => (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) =>
    setState((prev) => ({
      ...prev,
      filter: { ...prev.filter, [key]: event.target.value },
    }));

  return (
    <div className={classes.root}>
      <div className={classes.filter}>
        <Typography className={classes.filterLabel}>Filter:</Typography>
        <FormControl className={classes.filterControl} variant="outlined">
          <InputLabel className={classes.filterSelectLabel} id="type-label">
            Type
          </InputLabel>
          <Select
            className={classes.filterSelect}
            disableUnderline
            labelId="type-label"
            onChange={onChangeFilter("type")}
            value={state.filter.type}
          >
            <MenuItem value="Type1">Type1</MenuItem>
            <MenuItem value="Type2">Type2</MenuItem>
            <MenuItem value="Type3">Type3</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.filterControl} variant="outlined">
          <InputLabel className={classes.filterSelectLabel} id="type-label">
            Platform
          </InputLabel>
          <Select
            className={classes.filterSelect}
            disableUnderline
            labelId="type-label"
            onChange={onChangeFilter("platform")}
            value={state.filter.platform}
          >
            <MenuItem value="Platform1">Platform1</MenuItem>
            <MenuItem value="Platform2">Platform2</MenuItem>
            <MenuItem value="Platform3">Platform3</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.filterControl} variant="outlined">
          <InputLabel className={classes.filterSelectLabel} id="type-label">
            Token
          </InputLabel>
          <Select
            className={classes.filterSelect}
            disableUnderline
            labelId="type-label"
            onChange={onChangeFilter("token")}
            value={state.filter.token}
          >
            <MenuItem value="Token1">Token1</MenuItem>
            <MenuItem value="Token2">Token2</MenuItem>
            <MenuItem value="Token3">Token3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.content}>
        <div className={commonClasses.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Liquidity Pool</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Return(24h)</TableCell>
                <TableCell>Valuation</TableCell>
                <TableCell>Asset Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPools.map((pool) => (
                <TableRow
                  className={clsx(
                    pool.returns24h < 0 ? "negative" : "positive"
                  )}
                  key={pool.id}
                  onClick={() => {
                    history.push(`/pool/${pool.id}`);
                  }}
                >
                  <TableCell>{pool.name}</TableCell>
                  <TableCell>{pool.symbol}</TableCell>
                  <TableCell>${numberWithCommas(pool.price)}</TableCell>
                  <TableCell>
                    <span>
                      {pool.returns24h < 0 && <ArrowDropDownIcon />}
                      {pool.returns24h >= 0 && <ArrowDropUpIcon />}
                      {pool.returns24h}%
                    </span>
                  </TableCell>
                  <TableCell>{pool.valuation}</TableCell>
                  <TableCell>{pool.assetType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};