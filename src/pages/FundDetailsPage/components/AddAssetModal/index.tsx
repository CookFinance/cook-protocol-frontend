import { makeStyles } from "@material-ui/core";
import { BaseModal } from "components";
import React, { useState } from "react";
import { KnownToken } from "types";

const useStyles = makeStyles((theme) => ({
  selectItem: {
    height: 240,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  selectItemTitle: {
    fontSize: 20,
    color: theme.colors.primary,
  },
  selectItemDescription: {
    fontSize: 16,
    color: theme.colors.secondary,
    marginTop: 16,
  },
}));

enum EStep {
  Select = "Select",
  Token = "Token",
  Yield = "Yield",
}

interface IProps {
  visible: boolean;
  onClose: () => void;
}

interface IState {
  step: EStep;
  tokenId?: KnownToken;
}

export const AddAssetModal = (props: IProps) => {
  const { onClose, visible } = props;
  const [state, setState] = useState<IState>({
    step: EStep.Select,
  });

  const onBack = () => {};

  const renderSelect = () => {
    return <div></div>;
  };

  const renderTokenSelect = () => {};

  const renderYieldSelect = () => {};

  return (
    <BaseModal
      onBack={onBack}
      onClose={onClose}
      title={
        state.step === EStep.Select
          ? "Add new asset"
          : state.step === EStep.Token
          ? "Choose Token"
          : "Choose Yield"
      }
      visible={visible}
    >
      <div>
        {state.step === EStep.Select && renderSelect()}
        {state.step === EStep.Token && renderTokenSelect()}
        {state.step === EStep.Yield && renderYieldSelect()}
      </div>
    </BaseModal>
  );
};
