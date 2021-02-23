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
import { TOKEN_DECIMALS } from "config/constants";
import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useCommonStyles from "styles/common";
import { ICoinPrices, IPool } from "types";
import { formatBigNumber, numberWithCommas } from "utils";
import { ZERO_NUMBER } from "utils/number";
import { calculateValuation, getCoinsPrices } from "utils/token";

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
  // {
  //   id: "12",
  //   address: "1233",
  //   name: "Liquidity Pool",
  //   symbol: "DSC",
  //   price: 150,
  //   returns24h: -2,
  //   valuation: 12500000,
  //   assetType: "Smart Contract",
  // },
  // {
  //   id: "13",
  //   address: "1234",
  //   name: "DeFi Liquidity Pool",
  //   symbol: "DEFILEND",
  //   price: 120,
  //   returns24h: 15,
  //   valuation: 15500000,
  //   assetType: "Lending, Stablecoins",
  // },
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

const defaultCoinPrices: ICoinPrices = {
  current: {
    eth: ZERO_NUMBER,
    btc: ZERO_NUMBER,
    link: ZERO_NUMBER,
    xrp: ZERO_NUMBER,
    ltc: ZERO_NUMBER,
    dot: ZERO_NUMBER,
  },
  prev: {
    eth: ZERO_NUMBER,
    btc: ZERO_NUMBER,
    link: ZERO_NUMBER,
    xrp: ZERO_NUMBER,
    ltc: ZERO_NUMBER,
    dot: ZERO_NUMBER,
  },
};

interface IState {
  filter: {
    type: string;
    platform: string;
    token: string;
  };
  tokenPrices: ICoinPrices;
}

export const PoolsSection = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const history = useHistory();

  const [state, setState] = useState<IState>({
    filter: { type: "", platform: "", token: "" },
    tokenPrices: defaultCoinPrices,
  });

  useEffect(() => {
    const loadCoinPrices = async () => {
      const prices = await getCoinsPrices();
      setState((prev) => ({ ...prev, tokenPrices: prices }));
    };
    loadCoinPrices();
  }, []);

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
            {typeFilters.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
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
            {platformFilters.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
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
                  state.tokenPrices.current,
                  pool.tokens
                );
                const prevValuation = calculateValuation(
                  state.tokenPrices.prev,
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
