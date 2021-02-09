import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import useCommonStyles from "styles/common";

import { Header } from "./components";

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.custom.appHeaderHeight, height: "100vh" },
  content: {
    height: "100%",
    background: `radial-gradient(${theme.colors.primary}, ${theme.colors.secondary})`,
    overflowY: "auto",
  },
}));

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const MainLayout = (props: IProps) => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <main className={clsx(classes.content, commonClasses.scroll)}>
        {props.children}
      </main>
    </div>
  );
};
