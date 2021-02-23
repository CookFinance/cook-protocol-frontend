import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import CreateLiquidityPoolForm from "components/Form/CreateLiquidityPoolForm";
import { useGlobal } from "contexts";
import React from "react";
import { useHistory } from "react-router-dom";
import useCommonStyles from "styles/common";
import { ICreateLiquidityPool } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 100,
  },
  title: {
    marginTop: 80,
    fontSize: 50,
    fontWeight: "bold",
    color: theme.colors.default,
  },
}));

const CreatePage = () => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  const history = useHistory();
  const { addPool } = useGlobal();
  const onSubmit = (payload: ICreateLiquidityPool) => {
    addPool(payload);
    history.push("/pool");
  };
  return (
    <div className={clsx(classes.root, commonClasses.limitedContent)}>
      <Typography align="center" className={classes.title}>
        Create Liquidity Pool
      </Typography>
      <CreateLiquidityPoolForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreatePage;
