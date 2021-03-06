import { Theme } from "@material-ui/core/styles/createMuiTheme";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      appHeaderHeight: React.CSSProperties["height"];
      appNavbarWidth: React.CSSProperties["width"];
    };
    colors: {
      transparent: string;
      default: string;
      reverse: string;
      primary: string;
      secondary: string;
      third: string;
      fourth: string;
      gray10: string;
      gray20: string;
      gray30: string;
      gray40: string;
      warn: string;
      success: string;
      neutral900: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom: {
      appHeaderHeight: React.CSSProperties["height"];
      appNavbarWidth: React.CSSProperties["width"];
    };
    colors: {
      transparent: string;
      default: string;
      reverse: string;
      primary: string;
      secondary: string;
      third: string;
      fourth: string;
      gray10: string;
      gray20: string;
      gray30: string;
      gray40: string;
      warn: string;
      success: string;
      neutral900: string;
    };
  }
}
