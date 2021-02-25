import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { transparentize } from "polished";
import React from "react";
import useCommonStyles from "styles/common";
import { ICreateFund } from "types";
import * as Yup from "yup";

import { FormAutocompleteMultipleRow, FormSelectField } from "../index";

const useStyles = makeStyles((theme) => ({
  root: { height: "100%", position: "relative", overflow: "hidden" },
  contentWrapper: {
    backgroundColor: theme.colors.default,
    display: "flex",
    overflowY: "auto",
    height: "100%",
  },
  leftContentWrapper: {
    width: "66%",
    borderRight: `1px solid ${theme.colors.third}`,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderRight: "none",
    },
  },
  rightContentWrapper: {
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
    },
  },
  title: {
    fontSize: 16,
    color: theme.colors.reverse,
  },
  description: {
    fontSize: 40,
    color: theme.colors.reverse,
    lineHeight: "48px",
    marginTop: 24,
  },
  comment: { fontSize: 16, color: theme.colors.fourth, marginBottom: 16 },
  groupComment: {
    fontSize: 16,
    color: theme.colors.reverse,
    marginBottom: 8,
    marginTop: 32,
    fontWeight: 500,
    "&.top": {
      marginTop: 0,
    },
  },
  percentInput: {
    textAlign: "right",
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&[type=number]": {
      "-moz-appearance": "textfield",
    },
  },
  chip: {
    backgroundColor: theme.colors.primary,
    fontSize: 16,
    padding: 8,
    borderRadius: 16,
    justifyContent: "space-between",
    "& > span": {
      marginRight: 24,
      fontWeight: 200,
    },
    "& svg": {
      width: 16,
      height: 16,
      marginRight: "0px !important",
    },
  },
  autoCompleteInput: {
    fontSize: 16,
    marginTop: 3,
    "& input": {
      fontSize: 16,
    },
  },
  link: {
    color: transparentize(0.2, theme.colors.default),
    fontSize: 24,
    marginTop: 90,
    display: "inline-block",
  },
  checkbox: {
    marginTop: 50,
    marginBottom: 50,
    display: "flex",
    color: transparentize(0.5, theme.colors.default),
    fontSize: 24,
    "& svg": {
      width: 30,
      height: 30,
      color: transparentize(0.5, theme.colors.default),
    },
  },
  submit: {
    minWidth: 310,
    height: 60,
    backgroundColor: theme.colors.third,
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.reverse,
    textTransform: "none",
  },
}));

export interface ICreateFundFormValues extends ICreateFund {
  accepted: boolean;
}

export interface IProps {
  onSubmit: (_: ICreateFund) => void;
}

const CreateLiquidityPoolForm = (props: IProps) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const initialFormValue: ICreateFundFormValues = {
    name: "",
    symbol: "",
    about: "",
    fee: 3,
    acceptedTokens: [],
    liquidityPoolType: "",
    platformWhitelist: [],
    tokenWhitelist: [],
    allowLeverage: "",
    accepted: false,
  };

  return (
    <Formik
      initialValues={initialFormValue}
      onSubmit={async (values, { setErrors }) => {
        console.log("-=-=-=-=");
        props.onSubmit(values);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        symbol: Yup.string().required(),
        about: Yup.string().required(),
        fee: Yup.number().required(),
        acceptedTokens: Yup.array().required(),
        platformWhitelist: Yup.array().required(),
        tokenWhitelist: Yup.array().required(),
        liquidityPoolType: Yup.string().required(),
        allowLeverage: Yup.string().required(),
      })}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldValue,
        touched,
        values,
      }) => (
        <Form onSubmit={handleSubmit}>
          <div className={classes.root}>
            <div className={clsx(classes.contentWrapper, commonClasses.scroll)}>
              <div
                className={clsx(
                  classes.leftContentWrapper,
                  commonClasses.pageContent
                )}
              >
                <Typography className={classes.title}>
                  Create new fund
                </Typography>
                <Typography className={classes.description}>
                  Very long title example for liquidity
                </Typography>
                <Typography className={classes.comment}>
                  This liquidity pool will invest in altcoins that have huge
                  growth potential, seeking 100 times of return
                </Typography>
                <Typography className={classes.groupComment}>
                  General Info
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      error={Boolean(touched.symbol && errors.symbol)}
                      fullWidth
                      helperText={touched.symbol && errors.symbol}
                      id="symbol"
                      label="Symbol"
                      name="symbol"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter symbol"
                      required
                      value={values.symbol}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      error={Boolean(touched.fee && errors.fee)}
                      fullWidth
                      helperText={touched.fee && errors.fee}
                      id="fee"
                      label="Fee %"
                      name="fee"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter fee"
                      required
                      type="number"
                      value={values.fee}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id="allowLeverage"
                      label="Allow Leverage:"
                      name="allowLeverage"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Allow Leverage:"
                      required
                      select
                      value={values.allowLeverage}
                      variant="outlined"
                    >
                      {[
                        { label: "1x", value: "1x" },
                        { label: "3x", value: "3x" },
                        { label: "5x", value: "5x" },
                        { label: "7x", value: "6x" },
                        { label: "10x", value: "10x" },
                      ].map((e) => (
                        <MenuItem key={e.value} value={e.value}>
                          {e.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <FormSelectField
                      FormControlProps={{ fullWidth: true }}
                      InputLabelProps={{
                        htmlFor: "liquidityPoolType",
                        shrink: true,
                      }}
                      SelectProps={{
                        id: "liquidityPoolType",
                        name: "liquidityPoolType",
                        onBlur: handleBlur,
                        onChange: handleChange,
                        value: values.liquidityPoolType,
                      }}
                      items={[{ label: "Spot - DEFI", value: "Spot - DEFI" }]}
                      label="Liquidity Pool Type:"
                    />
                  </Grid>
                </Grid>
                <Typography className={classes.groupComment}>
                  Whitelists
                </Typography>

                <FormAutocompleteMultipleRow
                  AutocompleteProps={{
                    multiple: true,
                    fullWidth: true,
                    id: "Platform Whitelist",
                    size: "small",
                    options: [
                      { title: "Compound", value: "Compound" },
                      { title: "Uniswap", value: "Uniswap" },
                    ],
                    getOptionLabel: (option) => option.title || "",
                    // eslint-disable-next-line react/display-name
                    renderInput: (params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                        className={clsx(
                          (params as any).className,
                          classes.autoCompleteInput
                        )}
                        placeholder="Uniswap"
                        variant="standard"
                      />
                    ),
                    renderTags: (value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={`${option.value || index}`}
                          label={option.title}
                          size="small"
                          variant="outlined"
                          {...getTagProps({ index })}
                          className={clsx(
                            (getTagProps({ index }) as any).className,
                            classes.chip
                          )}
                        />
                      )),
                  }}
                  FormHelperTextProps={{
                    error: Boolean(
                      touched.platformWhitelist && errors.platformWhitelist
                    ),
                  }}
                  helperText={
                    touched.platformWhitelist && errors.platformWhitelist
                      ? errors.platformWhitelist[0]
                      : ""
                  }
                  label="Accepted Tokens:"
                />
              </div>
              <div
                className={clsx(
                  classes.rightContentWrapper,
                  commonClasses.pageContent
                )}
              >
                <Typography className={clsx(classes.groupComment, "top")}>
                  Accepted Assets
                </Typography>
                <FormAutocompleteMultipleRow
                  AutocompleteProps={{
                    multiple: true,
                    fullWidth: true,
                    id: "acceptedTokens",
                    size: "small",
                    options: [
                      { title: "ETH", value: "eth" },
                      { title: "BTC", value: "btc" },
                    ],
                    getOptionLabel: (option) => option.title || "",
                    // eslint-disable-next-line react/display-name
                    renderInput: (params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                        className={clsx(
                          (params as any).className,
                          classes.autoCompleteInput
                        )}
                        placeholder="BTC"
                        variant="standard"
                      />
                    ),
                    renderTags: (value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={`${option.value || index}`}
                          label={option.title}
                          size="small"
                          variant="outlined"
                          {...getTagProps({ index })}
                          className={clsx(
                            (getTagProps({ index }) as any).className,
                            classes.chip
                          )}
                        />
                      )),
                  }}
                  FormHelperTextProps={{
                    error: Boolean(
                      touched.acceptedTokens && errors.acceptedTokens
                    ),
                  }}
                  helperText={
                    touched.acceptedTokens && errors.acceptedTokens
                      ? errors.acceptedTokens[0]
                      : ""
                  }
                  label="Accepted Tokens:"
                />
              </div>
            </div>
            <a className={classes.link} href="https://google.com">
              *Your liquidity pool is subject to law and regulations...
            </a>
            <FormControlLabel
              className={classes.checkbox}
              control={<Checkbox color="primary" />}
              label="I accepted the terms & condition"
              labelPlacement="end"
              name="accepted"
              onChange={handleChange}
              value={values.accepted}
            />
            <Button
              className={classes.submit}
              color="primary"
              disabled={!values.accepted || !isValid}
              type="submit"
              variant="contained"
            >
              Create
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateLiquidityPoolForm;
