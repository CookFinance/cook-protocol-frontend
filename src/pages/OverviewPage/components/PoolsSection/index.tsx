import {
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import clsx from "clsx";
import { TOKEN_DECIMALS } from "config/constants";
import { useGlobal } from "contexts";
import { BigNumber } from "ethers";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useCommonStyles from "styles/common";
import { IPool } from "types";
import { formatBigNumber, numberWithCommas } from "utils";
import { ZERO_NUMBER } from "utils/number";
import { calculateValuation } from "utils/token";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 24,
  },
  filter: {
    display: "flex",
    alignItems: "center",
  },
  filterControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& + &": {
      marginLeft: 40,
    },
    "& > * +*": {
      marginLeft: 10,
    },
  },
  filterSelect: {
    minWidth: 140,
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    backgroundColor: theme.colors.default,
    marginTop: "0px !important",
    padding: "8px 10px",
  },
  filterSelectLabel: {
    color: `${theme.colors.third} !important`,
    display: "inline-block",
  },
  content: {
    marginTop: 24,
  },
}));

const mockPools: IPool[] = [
  {
    id: "1",
    address: "123",
    name: "COOK 10",
    symbol: "COOK100",
    assetType: "Spot - Composite",
    ckTokens: BigNumber.from("100000"),
    tokens: {
      btc: BigNumber.from("100"),
      eth: BigNumber.from("700"),
      xrp: BigNumber.from("312000"),
      link: BigNumber.from("4333"),
      ltc: BigNumber.from("433"),
      dot: BigNumber.from("4622"),
    },
  },
];

const typeFilters = [
  { label: "Spot Composite", value: "spot-composite" },
  { label: "Smart Contract", value: "smart-contract" },
  { label: "Stablecoins", value: "stablecoins" },
];
const platformFilters = [
  { label: "Ethereum", value: "ethereum" },
  { label: "Polkadot", value: "polkadot" },
  { label: "Binance Smart Chain", value: "bsc" },
  { label: "Huobi Eco Chain", value: "hec" },
];
const tokenFilters = [
  { label: "ETH", value: "eth" },
  { label: "BTC", value: "btc" },
  { label: "LINK", value: "link" },
  { label: "USDT", value: "usdt" },
  { label: "BNB", value: "bnb" },
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

  const { tokenPrices } = useGlobal();
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
        <FormControl className={classes.filterControl}>
          <label className={classes.filterSelectLabel} htmlFor="type-label">
            Type
          </label>
          <Select
            className={classes.filterSelect}
            disableUnderline
            labelId="type-label"
            onChange={onChangeFilter("type")}
            value={state.filter.type}
          >
            {typeFilters.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.filterControl}>
          <label className={classes.filterSelectLabel} htmlFor="type-label">
            Platform
          </label>
          <Select
            className={classes.filterSelect}
            disableUnderline
            labelId="type-label"
            onChange={onChangeFilter("platform")}
            value={state.filter.platform}
          >
            {platformFilters.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.filterControl}>
          <label className={classes.filterSelectLabel} htmlFor="type-label">
            Token
          </label>
          <Select
            className={classes.filterSelect}
            disableUnderline
            labelId="type-label"
            onChange={onChangeFilter("token")}
            value={state.filter.token}
          >
            {tokenFilters.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
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
              {mockPools.map((pool) => {
                const curValuation = calculateValuation(
                  tokenPrices.current,
                  pool.tokens
                );
                const prevValuation = calculateValuation(
                  tokenPrices.prev,
                  pool.tokens
                );

                const difference = curValuation
                  .sub(prevValuation)
                  .mul(BigNumber.from("1000"));

                const return24hBigNumber = prevValuation.isZero()
                  ? ZERO_NUMBER
                  : difference.div(prevValuation);

                const returns24h =
                  Number(formatBigNumber(return24hBigNumber, 0, 3)) / 1000;

                const price = curValuation.div(pool.ckTokens);

                return (
                  <TableRow
                    className={clsx(returns24h < 0 ? "negative" : "positive")}
                    key={pool.id}
                    onClick={() => {
                      history.push(`/pool/${pool.id}`);
                    }}
                  >
                    <TableCell>{pool.name}</TableCell>
                    <TableCell>{pool.symbol}</TableCell>
                    <TableCell>
                      $
                      {numberWithCommas(formatBigNumber(price, TOKEN_DECIMALS))}
                    </TableCell>
                    <TableCell>
                      <span>
                        {returns24h < 0 && <ArrowDropDownIcon />}
                        {returns24h >= 0 && <ArrowDropUpIcon />}
                        {returns24h}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {formatBigNumber(curValuation, TOKEN_DECIMALS)}
                    </TableCell>
                    <TableCell>{pool.assetType}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
