import {
  CircularProgress,
  Divider,
  Modal,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TokenInput } from "components/Input";
import { tokenIds } from "config/network";
import { BigNumber } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { KnownToken } from "types";
import { getLogger } from "utils/logger";
import { ZERO_NUMBER } from "utils/number";

import { BaseModal } from "../BaseModal";

const logger = getLogger("UniswapModal::Index");

const useStyles = makeStyles((theme) => ({}));

interface IProps {
  visible: boolean;
  onClose: () => void;
}

interface IState {
  fromToken: KnownToken;
  fromAmount: BigNumber;
  toToken: KnownToken;
  toAmount: BigNumber;
  estimatedToken: KnownToken;
  fromBalance: BigNumber;
}

export const UniswapModal = (props: IProps) => {
  const classes = useStyles();
  const [state, setState] = useState<IState>({
    fromToken: "eth",
    fromAmount: ZERO_NUMBER,
    toToken: "usdt",
    toAmount: ZERO_NUMBER,
    estimatedToken: "usdt",
    fromBalance: ZERO_NUMBER,
  });

  const onBack = () => {};

  return (
    <BaseModal
      backVisible
      onBack={onBack}
      onClose={props.onClose}
      title="Swap"
      visible={props.visible}
    >
      <div>
        <TokenInput
          amount={state.fromAmount}
          maxVisible
          onChangeToken={() => {}}
          onChangeValue={(newAmount) => {
            setState((prev) => ({ ...prev, fromAmount: newAmount }));
          }}
          onMax={() => {}}
          token={state.fromToken}
        />
        <TokenInput
          amount={state.toAmount}
          onChangeToken={() => {}}
          onChangeValue={(newAmount) => {
            setState((prev) => ({ ...prev, toAmount: newAmount }));
          }}
          onMax={() => {}}
          token={state.toToken}
        />
      </div>
    </BaseModal>
  );
};
