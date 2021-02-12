import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginBottom: 60,
    color: theme.colors.default,
    fontSize: 32,
    lineHeight: "42px",
  },
}));

interface IProps {
  className?: string;
}

export const TokenDistributionSection = (props: IProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography>Token Distribution</Typography>
    </div>
  );
};
