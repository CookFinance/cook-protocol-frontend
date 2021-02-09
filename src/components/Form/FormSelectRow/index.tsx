import {
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  MenuItem,
  Select,
  SelectProps,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import { transparentize } from "polished";
import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "flex",
    flexDirection: "row",
  },
  formControlLabel: {
    display: "inline-block",
    color: transparentize(0.5, theme.colors.default),
    fontSize: 24,
    minWidth: 280,
    marginTop: 32,
  },
  formControlContent: {
    backgroundColor: theme.colors.secondary,
    padding: "27px 30px",
    width: "40%",
    "&.fullWidth": {
      flex: 1,
    },
  },
  formControlSelect: {
    width: "100%",
    color: theme.colors.default,
    fontSize: 22,
    borderRadius: 4,
  },
  formControlHelperText: {
    fontSize: 18,
  },
}));

interface IProps {
  FormHelperTextProps: FormHelperTextProps;
  SelectProps: SelectProps;
  label: string;
  labelWidth: React.CSSProperties["width"];
  helperText: string;
  inputFullWidth?: boolean;
  items: { label: string; value: string }[];
}

export const FormSelectRow = (props: IProps) => {
  const classes = useStyles();
  const {
    FormHelperTextProps,
    SelectProps,
    helperText,
    inputFullWidth = false,
    items,
    label,
    labelWidth,
  } = props;

  return (
    <FormControl className={classes.formControl} fullWidth>
      <label
        className={classes.formControlLabel}
        htmlFor={SelectProps.id || ""}
        style={{ minWidth: labelWidth, maxWidth: labelWidth }}
      >
        {label}
      </label>
      <div
        className={clsx(
          classes.formControlContent,
          inputFullWidth ? "fullWidth" : ""
        )}
      >
        <Select
          disableUnderline
          {...SelectProps}
          className={clsx(classes.formControlSelect, SelectProps.className)}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && (
          <FormHelperText
            className={classes.formControlHelperText}
            {...FormHelperTextProps}
          >
            {helperText}
          </FormHelperText>
        )}
      </div>
    </FormControl>
  );
};
