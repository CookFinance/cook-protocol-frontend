import { ReactComponent as BalSvg } from "assets/svgs/token/bal.svg";
import { ReactComponent as CompSvg } from "assets/svgs/token/comp.svg";
import { ReactComponent as DaiSvg } from "assets/svgs/token/dai.svg";
import { ReactComponent as DotSvg } from "assets/svgs/token/dot.svg";
import { ReactComponent as EthSvg } from "assets/svgs/token/eth.svg";
import { ReactComponent as LinkSvg } from "assets/svgs/token/link.svg";
import { ReactComponent as LtcSvg } from "assets/svgs/token/ltc.svg";
import { ReactComponent as RepSvg } from "assets/svgs/token/rep.svg";
import { ReactComponent as UniSvg } from "assets/svgs/token/uni.svg";
import { ReactComponent as XlmSvg } from "assets/svgs/token/xlm.svg";
import { ReactComponent as XrpSvg } from "assets/svgs/token/xrp.svg";
import { ReactComponent as YfiSvg } from "assets/svgs/token/yfi.svg";
import { ReactComponent as ZrxSvg } from "assets/svgs/token/zrx.svg";
import { ReactComponent as CoinbaseSVG } from "assets/svgs/wallet/coinbase.svg";
import { ReactComponent as FormaticSVG } from "assets/svgs/wallet/fortmatic.svg";
import { ReactComponent as MetaMaskSVG } from "assets/svgs/wallet/metamask-color.svg";
import { ReactComponent as WalletConnectSVG } from "assets/svgs/wallet/wallet-connect.svg";
import { KnownToken } from "types";
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

export const TOKEN_ICONS: { [key in KnownToken]: React.ElementType } = {
  comp: CompSvg,
  uni: UniSvg,
  eth: EthSvg,
  link: LinkSvg,
  xlm: XlmSvg,
  ltc: LtcSvg,
  dot: DotSvg,
  bal: BalSvg,
  yfi: YfiSvg,
  rep: RepSvg,
  dai: DaiSvg,
  xrp: XrpSvg,
  zrx: ZrxSvg,
};

export const PlATFORMS = [
  { label: "Compound", value: "comp" },
  { label: "Uniswap", value: "uni" },
];

export const TOKENS = [
  { label: "ETH", value: "eth" },
  { label: "LINK", value: "link" },
  { label: "XLM", value: "xlm" },
  { label: "LTC", value: "ltc" },
  { label: "DOT", value: "dot" },
];
