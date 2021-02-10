import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import CreateLiquidityPoolForm from "components/Form/CreateLiquidityPoolForm";
import React from "react";
import useCommonStyles from "styles/common";

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
  return (
    <div className={clsx(classes.root, commonClasses.limitedContent)}>
      <Typography align="center" className={classes.title}>
        Create Liquidity Pool
      </Typography>
      <CreateLiquidityPoolForm />
    </div>
  );
};

export default CreatePage;
