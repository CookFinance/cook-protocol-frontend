import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { CreateLiquidityPoolForm, Spinner } from "components";
import { DEFAULT_NETWORK_ID } from "config/constants";
import { getContractAddress, getToken } from "config/network";
import { useConnectedWeb3Context, useGlobal } from "contexts";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import React from "react";
import { useHistory } from "react-router-dom";
import { FactoryService } from "services/factory";
import { ICreateFund, KnownToken } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

const NewFundPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { account, library: provider, networkId } = useConnectedWeb3Context();
  const { setTransactionModalVisible } = useGlobal();

  const onSubmit = async (payload: ICreateFund) => {
    if (!provider) return;

    const factoryAddress = getContractAddress(
      networkId || DEFAULT_NETWORK_ID,
      "factory"
    );
    const factoryService = new FactoryService(
      provider,
      account,
      factoryAddress
    );
    const tokens: string[] = [];
    const units: BigNumber[] = [];

    payload.acceptedTokens.forEach((tokenId) => {
      const tokenInfo = getToken(tokenId as KnownToken, networkId);
      tokens.push(tokenInfo.address);
      units.push(parseEther("1"));
    });

    try {
      const txHash = await factoryService.createFund(
        tokens,
        units,
        account || "",
        payload.name,
        payload.symbol
      );
      setTransactionModalVisible(true, txHash);
      await provider.waitForTransaction(txHash);
      setTransactionModalVisible(false);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={clsx(classes.root)}>
      <CreateLiquidityPoolForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewFundPage;
