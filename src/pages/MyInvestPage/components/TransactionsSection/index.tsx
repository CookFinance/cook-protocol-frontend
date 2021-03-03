import { makeStyles } from "@material-ui/core";
import { SortableFundsTable } from "components";
import { TOKEN_DECIMALS } from "config/constants";
import { useGlobal } from "contexts";
import { BigNumber } from "ethers";
import React, { useState } from "react";
import { IPoolDetails } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 24,
  },
  content: {},
}));

interface IProps {
  pools: IPoolDetails[];
}

export const TransactionsSection = (props: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div>
          <SortableFundsTable rows={props.pools} />
        </div>
      </div>
    </div>
  );
};
