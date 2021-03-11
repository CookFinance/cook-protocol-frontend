import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import CreateLiquidityPoolForm from "components/Form/CreateLiquidityPoolForm";
import { useGlobal } from "contexts";
import React from "react";
import { useHistory } from "react-router-dom";
import { ICreateFund } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

const NewFundPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addFund } = useGlobal();
  const onSubmit = (payload: ICreateFund) => {
    addFund(payload);
    history.push("/funds");
  };
  return (
    <div className={clsx(classes.root)}>
      <CreateLiquidityPoolForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewFundPage;
