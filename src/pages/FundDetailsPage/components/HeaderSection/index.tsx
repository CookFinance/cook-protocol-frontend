import { Typography, makeStyles } from "@material-ui/core";
import { ReactComponent as LeftIcon } from "assets/svgs/left.svg";
import clsx from "clsx";
import { transparentize } from "polished";
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
}));

interface IProps {
  className?: string;
}

export const HeaderSection = (props: IProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.left}>
        <LeftIcon />
        <Typography>Fund name:</Typography>
      </div>
      <Typography>Cook 10 - fund manager portfolio view</Typography>
    </div>
  );
};
