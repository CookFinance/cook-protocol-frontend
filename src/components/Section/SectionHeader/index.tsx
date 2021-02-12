import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: theme.colors.default,
    fontSize: 32,
    lineHeight: "42px",
    fontWeight: "bold",
  },
  more: {
    color: theme.colors.default,
    fontSize: 20,
    lineHeight: "26px",
    cursor: "pointer",
    userSelect: "none",
  },
}));

interface IProps {
  title: string;
  showMore?: boolean;
  onShowMore?: () => void;
  className?: string;
}

export const SectionHeader = (props: IProps) => {
  const classes = useStyles();
  const { onShowMore = () => {}, showMore = false, title } = props;
  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography className={classes.title}>{title}</Typography>
      {showMore && (
        <div className={classes.more} onClick={onShowMore}>
          Show More &gt;&gt;
        </div>
      )}
    </div>
  );
};
