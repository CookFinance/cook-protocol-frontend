import { transparentize } from "polished";
import { THEME } from "types/enums";

const colors = [
  {
    name: THEME.Black,
    colors: {
      transparent: "#0000",
      default: "#FFF",
      reverse: "#000",
      primary: "#1F2645",
      secondary: "#09092B",
      third: "#60E160",
      warn: "#E04848",
      success: "#60E160",
    },
  },
  {
    name: THEME.White,
    colors: {
      transparent: "#0000",
      default: "#FFF",
      reverse: "#000",
      primary: "#1F2645",
      secondary: "#09092B",
      third: "#60E160",
      warn: "#E04848",
      success: "#60E160",
    },
  },
];

export default colors;
