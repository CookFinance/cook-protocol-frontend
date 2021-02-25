import { ReactComponent as CompSvg } from "assets/svgs/token/comp.svg";
import { ReactComponent as DotSvg } from "assets/svgs/token/dot.svg";
import { ReactComponent as EthSvg } from "assets/svgs/token/eth.svg";
import { ReactComponent as LinkSvg } from "assets/svgs/token/link.svg";
import { ReactComponent as LtcSvg } from "assets/svgs/token/ltc.svg";
import { ReactComponent as UniSvg } from "assets/svgs/token/uni.svg";
import { ReactComponent as XlmSvg } from "assets/svgs/token/xlm.svg";
import { ReactComponent as CoinbaseSVG } from "assets/svgs/wallet/coinbase.svg";
import { ReactComponent as FormaticSVG } from "assets/svgs/wallet/fortmatic.svg";
import { ReactComponent as MetaMaskSVG } from "assets/svgs/wallet/metamask-color.svg";
import { ReactComponent as WalletConnectSVG } from "assets/svgs/wallet/wallet-connect.svg";
import { ConnectorNames } from "types/enums";

export const STORAGE_KEY_SETTINGS = "settings";
export const STORAGE_KEY_CONNECTOR = "CONNECTOR";

export const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID || "";

export const DEFAULT_NETWORK_ID = 1;
export const LOGGER_ID = "COOK PROTOCOL DEMO:";

export const TOKEN_DECIMALS = 18;

export const WALLET_ICONS: { [key in ConnectorNames]: React.ElementType } = {
  [ConnectorNames.Injected]: MetaMaskSVG,
  [ConnectorNames.WalletConnect]: WalletConnectSVG,
  [ConnectorNames.WalletLink]: CoinbaseSVG,
  [ConnectorNames.Fortmatic]: FormaticSVG,
};

export const TOKEN_ICONS: { [key: string]: React.ElementType } = {
  comp: CompSvg,
  uni: UniSvg,
  eth: EthSvg,
  lnk: LinkSvg,
  xlm: XlmSvg,
  ltc: LtcSvg,
  dot: DotSvg,
};

export const PlATFORMS = [
  { label: "Compound", value: "comp" },
  { label: "Uniswap", value: "uni" },
];

export const TOKENS = [
  { label: "ETH", value: "eth" },
  { label: "LINK", value: "lnk" },
  { label: "XLM", value: "xlm" },
  { label: "LTC", value: "ltc" },
  { label: "DOT", value: "dot" },
];
