import {
  Avatar,
  Button,
  Popover,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { STORAGE_KEY_CONNECTOR } from "config/constants";
import { useConnectedWeb3Context } from "contexts";
import { transparentize } from "polished";
import React from "react";
import { shortenAddress } from "utils";

const useStyles = makeStyles((theme) => ({
  root: {},
  connectButton: {
    borderColor: theme.colors.third,
    height: 50,
    textTransform: "none",
    fontSize: 18,
    paddingLeft: 21,
    paddingRight: 21,
    borderRadius: 8,
    position: "relative",
  },
  avatar: {
    position: "absolute",
    width: 64,
    height: 64,
    right: -32,
  },
  popover: {
    backgroundColor: transparentize(0.6, theme.colors.default),
    padding: theme.spacing(0.5),
  },
  popoverButton: {
    height: theme.spacing(5),
    minWidth: 130,
    textTransform: "none",
    fontSize: 18,
  },
}));

export const AccountInfoBar = () => {
  const classes = useStyles();
  const {
    account,
    rawWeb3Context,
    setWalletConnectModalOpened,
  } = useConnectedWeb3Context();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onConnect = () => {
    setWalletConnectModalOpened(true);
  };

  const onDisconnect = () => {
    rawWeb3Context.deactivate();
    localStorage.removeItem(STORAGE_KEY_CONNECTOR);
  };

  const open = Boolean(anchorEl);
  const id = open ? "account-popover" : undefined;

  return (
    <div className={classes.root}>
      {account ? (
        <>
          <Button
            className={classes.connectButton}
            onClick={handleClick}
            variant="outlined"
          >
            <Typography>{shortenAddress(account)}</Typography>
            <Avatar className={classes.avatar} src="/assets/mock/avatar.png" />
          </Button>
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            classes={{
              paper: classes.popover,
            }}
            id={id}
            onClose={handleClose}
            open={open}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Button
              className={classes.popoverButton}
              color="primary"
              onClick={() => {
                handleClose();
                onDisconnect();
              }}
              variant="contained"
            >
              Disconnect
            </Button>
          </Popover>
        </>
      ) : (
        <Button
          className={classes.connectButton}
          onClick={onConnect}
          variant="outlined"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};
