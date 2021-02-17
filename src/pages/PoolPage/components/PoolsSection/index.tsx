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
import { getToken, getUniswapGraph } from "config/network";
import { useConnectedWeb3Context } from "contexts";
import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useCommonStyles from "styles/common";
import { IPool, KnownToken } from "types";
import { formatBigNumber, numberWithCommas } from "utils";
import { ZERO_NUMBER } from "utils/number";
import { getTokenPrice } from "utils/uniswap";

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

const defaultTokenPrices: { [K in KnownToken]: BigNumber } = {
  btc: ZERO_NUMBER,
  eth: ZERO_NUMBER,
  link: ZERO_NUMBER,
  ltc: ZERO_NUMBER,
  dot: ZERO_NUMBER,
  xrp: ZERO_NUMBER,
};

interface IState {
  filter: {
    type: string;
    platform: string;
    token: string;
  };
  tokenPrices: { [K in KnownToken]: BigNumber };
  prevDayTokenPrices: { [K in KnownToken]: BigNumber };
}

export const PoolsSection = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const history = useHistory();
  const { networkId } = useConnectedWeb3Context();

  const [state, setState] = useState<IState>({
    filter: { type: "", platform: "", token: "" },
    tokenPrices: defaultTokenPrices,
    prevDayTokenPrices: defaultTokenPrices,
  });

  const uniswapTheGraph = getUniswapGraph(networkId || 1);

  useEffect(() => {
    const loadUniswapInfoBeforeTimeStamp = async (
      timestamp: number
    ): Promise<{ [K in KnownToken]: BigNumber }> => {
      const tokenPrices = defaultTokenPrices;
      const ethToken = getToken(networkId || 1, "eth");
      const ethPrice = await getTokenPrice(
        uniswapTheGraph.httpUri,
        ethToken.pairAddress,
        timestamp
      );
      tokenPrices.eth = ethPrice;
      return tokenPrices;
    };
    const loadUniswapInfo = async () => {
      try {
        const curTimeStamp = Date.now();
        const tokenPrices = await loadUniswapInfoBeforeTimeStamp(curTimeStamp);
        const prevDayTokenPrices = await loadUniswapInfoBeforeTimeStamp(
          curTimeStamp - 24 * 60 * 60 * 1000
        );
        setState((prev) => ({ ...prev, tokenPrices, prevDayTokenPrices }));
      } catch (error) {
        console.warn(error);
      }
    };
    loadUniswapInfo();
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
