import {
  CircularProgress,
  Divider,
  Modal,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ConnectWalletButton } from "components/Button";
import { STORAGE_KEY_CONNECTOR, WALLET_ICONS } from "config/constants";
import { transparentize } from "polished";
import React, { useCallback, useEffect } from "react";
import { ConnectorNames } from "types/enums";
import connectors from "utils/connectors";
import { getLogger } from "utils/logger";

const logger = getLogger("ConnectWalletModal::Index");

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    outline: "none",
    backgroundColor: theme.colors.default,
    width: 400,
    borderRadius: theme.spacing(0.5),
    padding: `${theme.spacing(2)}px 0`,
    userSelect: `none`,
    position: "relative",
  },
  title: {
    color: theme.colors.secondary,
    padding: `0 ${theme.spacing(2)}px`,
    fontWeight: "bold",
    fontSize: theme.spacing(2.5),
    marginBottom: theme.spacing(2),
  },
  bottom: {
    marginTop: theme.spacing(2),
    padding: `0 ${theme.spacing(2)}px`,
    textAlign: "center",
    "& > * + *": { marginTop: theme.spacing(2) },
  },
  closeButton: {
    position: "absolute",
    top: 21,
    right: 21,
    width: 24,
    height: 24,
    color: theme.colors.fourth,
    cursor: "pointer",
    "& svg": { width: 24, height: 24 },
  },
}));

interface IProps {
  visible: boolean;
  onClose: () => void;
}

export const ConnectWalletModal = (props: IProps) => {
  const context = useWeb3React();
  const classes = useStyles();
  const { onClose } = props;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === context.connector) {
      setActivatingConnector(undefined);
      onClose();
    }
    // eslint-disable-next-line
  }, [activatingConnector, context.connector]);

  if (context.error) {
    localStorage.removeItem(STORAGE_KEY_CONNECTOR);
    context.deactivate();
    onClose();
    logger.error("Error in web3 context", context.error);
  }

  const isMetamaskEnabled = "ethereum" in window || "web3" in window;
  const onClickWallet = (wallet: ConnectorNames) => {
    const currentConnector = connectors[wallet];
    if (wallet === ConnectorNames.Injected) {
      setActivatingConnector(currentConnector);
    }
    if (wallet === ConnectorNames.WalletConnect) {
      setActivatingConnector(currentConnector);
    }

    if (wallet) {
      if (
        currentConnector instanceof WalletConnectConnector &&
        currentConnector.walletConnectProvider?.wc?.uri
      ) {
        currentConnector.walletConnectProvider = undefined;
      }
      context.activate(currentConnector);
      localStorage.setItem(STORAGE_KEY_CONNECTOR, wallet);
    }
  };

  const resetEverything = useCallback(() => {}, []);

  const onClickCloseButton = useCallback(() => {
    resetEverything(); // we need to do this or the states and functions will keep executing even when the modal is closed by the user
    onClose();
  }, [onClose, resetEverything]);

  const isConnectingToWallet = !!activatingConnector;
  let connectingText = `Connecting to wallet`;
  const connectingToMetamask = activatingConnector === connectors.injected;
  const connectingToWalletConnect =
    activatingConnector === connectors.walletconnect;
  if (connectingToMetamask) {
    connectingText = "Waiting for Approval on Metamask";
  }
  if (connectingToWalletConnect) {
    connectingText = "Opening QR for Wallet Connect";
  }

  const disableMetamask: boolean = !isMetamaskEnabled || false;
  const disableWalletConnect = false;

  return (
    <>
      <Modal
        className={classes.modal}
        disableBackdropClick={isConnectingToWallet}
        disableEnforceFocus
        onClose={onClickCloseButton}
        open={!context.account && props.visible}
      >
        <div className={classes.content}>
          {!isConnectingToWallet && (
            <span className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </span>
          )}
          <Typography align="center" className={classes.title} component="h3">
            {connectingToMetamask ? "Connecting..." : "Connect"}
          </Typography>
          <div className={classes.bottom}>
            {isConnectingToWallet ? (
              <>
                <CircularProgress />
                <Typography>{connectingText}</Typography>
              </>
            ) : (
              <>
                <ConnectWalletButton
                  disabled={disableMetamask}
                  icon={WALLET_ICONS[ConnectorNames.Injected]}
                  onClick={() => {
                    onClickWallet(ConnectorNames.Injected);
                  }}
                  text="Metamask"
                />
                <ConnectWalletButton
                  disabled={disableWalletConnect}
                  icon={WALLET_ICONS[ConnectorNames.WalletConnect]}
                  onClick={() => {
                    onClickWallet(ConnectorNames.WalletConnect);
                  }}
                  text="Wallet Connect"
                />
                <ConnectWalletButton
                  disabled={disableWalletConnect}
                  icon={WALLET_ICONS[ConnectorNames.WalletLink]}
                  onClick={() => {
                    onClickWallet(ConnectorNames.WalletLink);
                  }}
                  text="Coinbase Wallet"
                />
                <ConnectWalletButton
                  disabled={disableWalletConnect}
                  icon={WALLET_ICONS[ConnectorNames.Fortmatic]}
                  onClick={() => {
                    onClickWallet(ConnectorNames.Fortmatic);
                  }}
                  text="Fortmatic"
                />
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
