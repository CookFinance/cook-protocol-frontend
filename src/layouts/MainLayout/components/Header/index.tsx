import { makeStyles } from "@material-ui/core";
import { ReactComponent as LogoSVG } from "assets/svgs/logo.svg";
import clsx from "clsx";
import HeaderNavbarItem from "components/Header/HeaderNavbarItem";
import React from "react";
import { NavLink } from "react-router-dom";
import useCommonStyles from "styles/common";

import { AccountInfoBar } from "../AccountInfoBar";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    height: theme.custom.appHeaderHeight,
    backgroundColor: theme.colors.secondary,
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  logo: {
    height: theme.spacing(6),
  },
  navItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 400,
    maxWidth: 700,
    width: "44%",
  },
  leftSpace: {
    flex: 1,
  },
  rightSpace: { flex: 2 },
}));

export const Header = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.root}>
      <div className={clsx(classes.content, commonClasses.limitedContent)}>
        <NavLink to="/">
          <LogoSVG />
        </NavLink>
        <div className={classes.leftSpace} />
        <div className={classes.navItems}>
          <HeaderNavbarItem link="/pool" title="Pool" />
          <HeaderNavbarItem link="/create" title="Create" />
          <HeaderNavbarItem link="/mining" title="Mining" />
          <HeaderNavbarItem link="/governance" title="Governance" />
        </div>
        <div className={classes.rightSpace} />
        <AccountInfoBar />
      </div>
    </div>
  );
};
