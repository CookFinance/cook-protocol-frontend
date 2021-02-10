import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const PoolPage = () => {
  const classes = useStyles();
  return <div className={classes.root}>PoolPage</div>;
};

export default PoolPage;
