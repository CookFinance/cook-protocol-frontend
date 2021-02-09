import {
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  Input,
  InputProps,
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
    width: "40%",
    "&.fullWidth": {
      flex: 1,
    },
  },
  formControlInput: {
    width: "100%",
    backgroundColor: theme.colors.secondary,
    padding: "27px 30px",
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
  InputProps: InputProps;
  label: string;
  labelWidth: React.CSSProperties["width"];
  helperText: string;
  inputFullWidth?: boolean;
}

export const FormInputRow = (props: IProps) => {
  const classes = useStyles();
  const {
    FormHelperTextProps,
    InputProps,
    helperText,
    inputFullWidth = false,
    label,
    labelWidth,
  } = props;

  return (
    <FormControl className={classes.formControl} fullWidth>
      <label
        className={classes.formControlLabel}
        htmlFor={InputProps.id || ""}
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
        <Input
          disableUnderline
          {...InputProps}
          className={clsx(classes.formControlInput, InputProps.className)}
        />
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
