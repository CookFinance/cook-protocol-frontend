import { Button, Typography, makeStyles } from "@material-ui/core";
import { ReactComponent as LeftIcon } from "assets/svgs/left.svg";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    display: "flex",
    alignItems: "center",
    fontSize: 24,
    lineHeight: 1.5,
    color: theme.colors.primary,
    "& > * + *": {
      marginLeft: 8,
    },
  },
  left: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.5s",

    "& p": {
      fontWeight: 300,
    },
    "&:hover": {
      opacity: 0.7,
    },
  },
  center: { flex: 1 },
  right: {
    display: "flex",
    alignItems: "center",
    "& > * + *": { marginLeft: 16 },
  },
  button: {
    height: 40,
    fontSize: 16,
    lineHeight: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    color: theme.colors.default,
    minWidth: 90,
    fontWeight: 300,
    "& span": {
      textTransform: "none",
    },
    "&:hover": {
      color: theme.colors.secondary,
    },
  },
}));

interface IProps {
  className?: string;
  onBuy: () => void;
  onSell: () => void;
}

export const HeaderSection = (props: IProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.left}>
        <LeftIcon />
        <Typography>Fund name:</Typography>
      </div>
      <Typography className={classes.center}>
        Cook 10 - fund manager portfolio view
      </Typography>
      <div className={classes.right}>
        <Button
          className={classes.button}
          color="secondary"
          onClick={props.onBuy}
          variant="outlined"
        >
          Buy
        </Button>
        <Button
          className={classes.button}
          color="secondary"
          onClick={props.onSell}
          variant="outlined"
        >
          Sell
        </Button>
      </div>
    </div>
  );
};
