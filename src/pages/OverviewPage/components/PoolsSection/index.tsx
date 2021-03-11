import { FormControl, MenuItem, Select, makeStyles } from "@material-ui/core";
import { SortableFundsTable } from "components";
import { TOKEN_DECIMALS } from "config/constants";
import { useConnectedWeb3Context, useGlobal } from "contexts";
import { BigNumber } from "ethers";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useCommonStyles from "styles/common";
import { IPool, IPoolDetails } from "types";
import { AssetType } from "types/enums";
import { formatBigNumber } from "utils";
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
    backgroundColor: theme.colors.default,
    marginTop: "0px !important",
    padding: "8px 10px",
    border: `1px solid ${theme.colors.third}`,
  },
  filterSelectLabel: {
    color: `${theme.colors.third} !important`,
    display: "inline-block",
  },
  content: {
    marginTop: 24,
  },
}));

const typeFilters = [
  { label: "Spot Composite", value: "spot-composite" },
  { label: "Smart Contract", value: "smart-contract" },
  { label: "Stablecoins", value: "stablecoins" },
];
const platformFilters = [
  { label: "Ethereum", value: "eth" },
  { label: "Polkadot", value: "dot" },
  { label: "Binance Smart Chain", value: "bsc" },
  { label: "Huobi Eco Chain", value: "hec" },
];
const tokenFilters = [
  { label: "ETH", value: "eth" },
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

interface IProps {
  pools: IPoolDetails[];
}

export const PoolsSection = (props: IProps) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const history = useHistory();
  const { networkId } = useConnectedWeb3Context();

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
        <div>
          <SortableFundsTable networkId={networkId} rows={props.pools} />
        </div>
      </div>
    </div>
  );
};
