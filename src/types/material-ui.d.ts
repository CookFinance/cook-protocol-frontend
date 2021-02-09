import { Theme } from "@material-ui/core/styles/createMuiTheme";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      appHeaderHeight: React.CSSProperties["height"];
      appHeaderContentMaxWidth: React.CSSProperties["height"];
    };
    colors: {
      transparent: string;
      default: string;
      reverse: string;
      primary: string;
      secondary: string;
      third: string;
      warn: string;
      success: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom: {
      appHeaderHeight: React.CSSProperties["height"];
      appHeaderContentMaxWidth: React.CSSProperties["height"];
    };
    colors: {
      transparent: string;
      default: string;
      reverse: string;
      primary: string;
      secondary: string;
      third: string;
      warn: string;
      success: string;
    };
  }
}
