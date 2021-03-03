import { Button, Popover, Typography, makeStyles } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import clsx from "clsx";
import { STORAGE_KEY_CONNECTOR, TOKEN_DECIMALS } from "config/constants";
import { useConnectedWeb3Context, useGlobal } from "contexts";
import { transparentize } from "polished";
import React from "react";
import { formatBigNumber, numberWithCommas, shortenAddress } from "utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& > * + *": {
      marginLeft: 16,
    },
  },
  connectButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.default,
    height: 40,
    textTransform: "none",
    fontSize: 16,
    position: "relative",
    minWidth: 260,
  },
  popover: {
    backgroundColor: theme.colors.default,
    width: 160,
    marginTop: 4,
    border: `1px solid ${theme.colors.third}`,
    padding: 16,
    borderRadius: 0,
  },
  popoverButton: {
    textTransform: "none",
    fontSize: 16,
    height: 28,
    display: "flex",
    alignItems: "center",
    color: theme.colors.secondary,
    cursor: "pointer",
    transition: "all 0.3s",
    "&:hover": {
      opacity: 0.7,
    },
  },
  infoButton: {
    minWidth: 140,
    height: 40,
    fontSize: 16,
    lineHeight: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& span": {
      textTransform: "none",
    },
  },
  infoArrow: {
    transition: "all 0.3s",
    "&.open": {
      transform: "rotate(180deg)",
    },
  },
  swapButton: {
    height: 40,
    fontSize: 16,
    lineHeight: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    color: theme.colors.default,
    "& span": {
      textTransform: "none",
    },
    "&:hover": {
      color: theme.colors.secondary,
    },
  },
}));

export const AccountInfoBar = () => {
  const classes = useStyles();
  const {
    account,
    rawWeb3Context,
    setWalletConnectModalOpened,
  } = useConnectedWeb3Context();
  const { ethBalance } = useGlobal();

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
            className={classes.infoButton}
            color="secondary"
            variant="outlined"
          >
            <Typography>
              {numberWithCommas(formatBigNumber(ethBalance, TOKEN_DECIMALS))}{" "}
              ETH
            </Typography>
          </Button>
          <Button
            className={classes.infoButton}
            color="secondary"
            onClick={handleClick}
            variant="outlined"
          >
            <Typography>{shortenAddress(account)}</Typography>
            &nbsp;
            <ExpandLessIcon
              className={clsx(classes.infoArrow, open ? "open" : "")}
            />
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
            <div
              className={classes.popoverButton}
              onClick={() => {
                handleClose();
                onDisconnect();
              }}
            >
              Disconnect
            </div>
          </Popover>
          <Button
            className={classes.swapButton}
            color="secondary"
            variant="outlined"
          >
            <Typography>Swap with Uniswap</Typography>
          </Button>
        </>
      ) : (
        <Button
          className={classes.connectButton}
          onClick={onConnect}
          variant="contained"
        >
          Connect
        </Button>
      )}
    </div>
  );
};
