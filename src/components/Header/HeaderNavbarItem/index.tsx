import { makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink, matchPath, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none",
    color: theme.colors.default,
    fontSize: 24,
    position: "relative",
    transition: "all 0.5s",
    "&::after": {
      transition: "all 0.5s",
      position: "absolute",
      content: `" "`,
      left: 5,
      right: 5,
      bottom: -8,
      height: 4,
      backgroundColor: theme.colors.transparent,
      borderRadius: 2,
    },
    "&:hover": {
      opacity: 0.7,
      "&::after": {
        backgroundColor: theme.colors.third,
      },
    },
    "&.active": {
      opacity: 1,
      "&::after": {
        backgroundColor: theme.colors.third,
      },
    },
  },
}));

interface IProps {
  title: string;
  link: string;
}

const HeaderNavbarItem = (props: IProps) => {
  const classes = useStyles();
  const { link, title } = props;
  const history = useHistory();
  const isActive = () =>
    !!matchPath(history.location.pathname, { path: link, exact: false });
  return (
    <NavLink className={classes.root} isActive={isActive} to={link}>
      {title}
    </NavLink>
  );
};

export default HeaderNavbarItem;
