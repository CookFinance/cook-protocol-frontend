import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import _ from "lodash";
import { ISettings } from "types";
import { THEME } from "types/enums";

import CustomColors from "./colors";
import custom from "./custom";
import { softShadows, strongShadows } from "./shadows";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: "hidden",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: "rgba(0,0,0,0.075)",
      },
    },
  },
};

const themesOptions = [
  {
    name: THEME.Black,
    overrides: {
      MuiInputBase: {
        input: {
          "&::placeholder": {
            opacity: 1,
            color: colors.blueGrey[600],
          },
        },
      },
      MuiButton: {
        root: {
          padding: "16px 25px 14px 25px",
          borderRadius: "6px",
        },
      },
    },
    palette: {
      type: "dark",
      action: {
        active: "rgba(255, 255, 255, 0.54)",
        hover: "rgba(255, 255, 255, 0.04)",
        selected: "rgba(255, 255, 255, 0.08)",
        disabled: "rgba(255, 255, 255, 0.26)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        focus: "rgba(255, 255, 255, 0.12)",
      },
      background: {
        default: "#030616",
        dark: "#1c2025",
        paper: "#282C34",
      },
      primary: {
        main: "#1F2645",
      },
      secondary: {
        main: "#09092B",
      },
      text: {
        primary: "#fff",
        secondary: "#fff",
      },
    },
    shadows: strongShadows,
  },
  {
    name: THEME.White,
    overrides: {
      MuiInputBase: {
        input: {
          "&::placeholder": {
            opacity: 1,
            color: colors.blueGrey[600],
          },
        },
      },
      MuiButton: {
        root: {
          padding: "16px 25px 14px 25px",
          borderRadius: "6px",
        },
      },
    },
    palette: {
      type: "light",
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: colors.common.white,
        dark: "#f4f6f8",
        paper: colors.common.white,
      },
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#fff",
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
];

export const createTheme = (config: ISettings) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);
  let customColor = CustomColors.find(
    (element) => element.name === config.theme
  );

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }
  if (!customColor) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [customColor] = CustomColors;
  }

  let theme = createMuiTheme(
    _.merge({}, baseOptions, themeOptions, { custom }, customColor) as any
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};