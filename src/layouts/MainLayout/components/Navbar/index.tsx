import { Button, makeStyles } from "@material-ui/core";
import { ReactComponent as OrverviewIcon } from "assets/svgs/navbar/chart.svg";
import { ReactComponent as FundIcon } from "assets/svgs/navbar/folder.svg";
import { ReactComponent as ProfileIcon } from "assets/svgs/navbar/profile.svg";
import { ReactComponent as InvestIcon } from "assets/svgs/navbar/wallet.svg";
import clsx from "clsx";
import { NavbarItem } from "components";
import React from "react";
import { useHistory } from "react-router-dom";
import useCommonStyles from "styles/common";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    left: 0,
    top: theme.custom.appHeaderHeight,
    bottom: 0,
    width: theme.custom.appNavbarWidth,
    backgroundColor: theme.colors.default,
    borderRight: `1px solid ${theme.colors.third}`,
    overflowY: "auto",
  },
  content: {
    padding: "24px 16px",
  },
  newFund: {
    height: 40,
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.third,
    marginTop: 24,
    marginBottom: 24,
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const history = useHistory();

  const onNewFund = () => {
    history.push("/new-fund");
  };

  return (
    <div className={clsx(classes.root, commonClasses.scroll)}>
      <div className={classes.content}>
        <Button
          className={classes.newFund}
          color="primary"
          fullWidth
          onClick={onNewFund}
          variant="contained"
        >
          New fund+
        </Button>
        <NavbarItem icon={OrverviewIcon} link="/overview" title="Overview" />
        <NavbarItem icon={FundIcon} link="/my-funds" title="My funds" />
        <NavbarItem icon={InvestIcon} link="/my-invest" title="My invest" />
        <div className={classes.divider} />
        <NavbarItem icon={ProfileIcon} link="/profile" title="Profile" />
      </div>
    </div>
  );
};
