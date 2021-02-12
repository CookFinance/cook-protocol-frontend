import { Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { SectionHeader } from "components";
import { transparentize } from "polished";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    padding: "22px 60px",
  },
  item: {
    padding: "28px 0",
    color: transparentize(0.5, theme.colors.default),
    fontSize: 24,
    lineHeight: "32px",
    "&:not(:first-child)": {
      borderTop: `1px solid ${transparentize(0.6, theme.colors.default)}`,
    },
  },
}));

interface IProps {
  className?: string;
}

export const WhitelistSection = (props: IProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, props.className)}>
      <SectionHeader title="Whitelist" />
      <div className={classes.content}>
        {["Compound", "Uniswap"].map((item) => (
          <div className={classes.item} key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
