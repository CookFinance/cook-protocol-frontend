import {
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  InputProps,
  makeStyles,
} from "@material-ui/core";
import { Autocomplete, AutocompleteProps } from "@material-ui/lab";
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
    backgroundColor: theme.colors.secondary,
    padding: "14px 30px",
    "&.fullWidth": {
      flex: 1,
    },
  },
  formControlHelperText: {
    fontSize: 18,
  },
}));

interface IProps {
  FormHelperTextProps: FormHelperTextProps;
  AutocompleteProps: AutocompleteProps<InputProps, true, false, false>;
  label: string;
  labelWidth: React.CSSProperties["width"];
  helperText: string;
  inputFullWidth?: boolean;
}

export const FormAutocompleteMultipleRow = (props: IProps) => {
  const classes = useStyles();
  const {
    AutocompleteProps,
    FormHelperTextProps,
    helperText,
    inputFullWidth = false,
    label,
    labelWidth,
  } = props;

  return (
    <FormControl className={classes.formControl} fullWidth>
      <label
        className={classes.formControlLabel}
        htmlFor={AutocompleteProps.id || ""}
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
        <Autocomplete {...AutocompleteProps} />
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
