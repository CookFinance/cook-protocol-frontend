import { Button, Typography, makeStyles } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import clsx from "clsx";
import { TokenInput } from "components/Input";
import { TokenSelectList } from "components/List";
import { TOKEN_DECIMALS } from "config/constants";
import { getToken } from "config/network";
import { useGlobal } from "contexts";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { transparentize } from "polished";
import React, { useState } from "react";
import { KnownToken } from "types";
import { formatBigNumber } from "utils";
import { getLogger } from "utils/logger";
import { ETH_NUMBER, ZERO_NUMBER } from "utils/number";

import { BaseModal } from "../BaseModal";

const logger = getLogger("BuySellModal::Index");

const MINIMUM_PRICE = parseEther("23.69");

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    marginBottom: 12,
    color: theme.colors.secondary,
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    lineHeight: 1.5,
    color: theme.colors.secondary,
  },
  swap: {
    height: 40,
    margin: "24px 0",
    backgroundColor: theme.colors.primary,
    color: theme.colors.default,
    "&:hover": {
      backgroundColor: theme.colors.default,
      color: theme.colors.primary,
    },
  },
  infoRow: {
    marginTop: 40,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
    lineHeight: 1.5,
    color: theme.colors.secondary,
    "& div": {
      display: "flex",
      alignItems: "center",
      "& svg": {
        color: transparentize(0.4, theme.colors.secondary),
        width: 20,
        height: 20,
      },
    },
    "& span": {
      color: theme.colors.primary,
      fontWeight: 500,
    },
  },
  tokenSelector: {
    maxHeight: "50vh",
    overflowY: "auto",
  },
  maxButton: {
    margin: "auto",
    marginBottom: 20,
    backgroundColor: theme.colors.gray30,
    padding: 8,
    borderRadius: 13,
    height: 26,
    width: 42,
    color: theme.colors.gray40,
    border: `1px solid ${theme.colors.gray40}`,
    fontSize: 12,
    lineHeight: "10px",
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      transition: "all 0.4s",
      opacity: 0.7,
    },
    "&.hidden": {
      opacity: 0,
      cursor: "auto",
    },
  },
}));

interface IProps {
  visible: boolean;
  onClose: () => void;
  isSell: boolean;
}

interface IState {
  token: KnownToken;
  amount: BigNumber;
  balance: BigNumber;
  showTokenSelect: boolean;
}

export const BuySellModal = (props: IProps) => {
  const classes = useStyles();
  const {
    tokenPrices: { current: currentTokenPrices },
  } = useGlobal();
  const { isSell } = props;
  const [state, setState] = useState<IState>({
    token: "eth",
    amount: ZERO_NUMBER,
    balance: parseEther("50"),
    showTokenSelect: false,
  });

  const price = currentTokenPrices[state.token].mul(state.amount);

  const onBack = () => {
    setState((prev) => ({ ...prev, showTokenSelect: false }));
  };

  return (
    <BaseModal
      backVisible={state.showTokenSelect}
      onBack={onBack}
      onClose={props.onClose}
      title={isSell ? "Sell" : "Buy"}
      visible={props.visible}
    >
      <div>
        {state.showTokenSelect ? (
          <div className={classes.tokenSelector}>
            <TokenSelectList
              disabledTokens={[state.token]}
              onSelect={(token: KnownToken) => {
                setState((prev) => ({
                  ...prev,
                  token,
                  showTokenSelect: false,
                }));
              }}
              searchable
            />
          </div>
        ) : (
          <>
            <Typography align="center" className={classes.label}>
              Balance: {formatBigNumber(state.balance, TOKEN_DECIMALS)}&nbsp;
              {state.token.toUpperCase()}
            </Typography>
            <div>
              <div
                className={clsx(classes.maxButton, isSell ? "" : "hidden")}
                onClick={() => {
                  if (isSell) {
                    setState((prev) => ({ ...prev, amount: prev.balance }));
                  }
                }}
              >
                MAX
              </div>
            </div>
            <TokenInput
              amount={state.amount}
              maxVisible={false}
              onChangeToken={() => {
                setState((prev) => ({
                  ...prev,
                  showTokenSelect: true,
                }));
              }}
              onChangeValue={(newAmount) => {
                setState((prev) => ({ ...prev, amount: newAmount }));
              }}
              onMax={() => {}}
              token={state.token}
            />
            <Typography align="right" className={classes.price}>
              {formatBigNumber(
                price,
                TOKEN_DECIMALS + getToken(state.token).decimals
              )}
              &nbsp; USD
            </Typography>
            <Typography className={classes.infoRow}>
              <div>
                Estimated shares&nbsp;
                <HelpOutlineIcon />
              </div>
              <span>21</span>
            </Typography>
            <Button
              className={classes.swap}
              color="primary"
              fullWidth
              variant="outlined"
            >
              {isSell ? "Sell" : "Buy"}
            </Button>
          </>
        )}
      </div>
    </BaseModal>
  );
};
