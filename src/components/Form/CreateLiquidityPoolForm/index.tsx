import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  TextField,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { transparentize } from "polished";
import React from "react";
import * as Yup from "yup";

import {
  FormAutocompleteMultipleRow,
  FormInputRow,
  FormSelectRow,
} from "../index";

const useStyles = makeStyles((theme) => ({
  root: {},
  contentWrapper: {
    marginTop: 90,
    padding: "60px 100px",
    backgroundColor: theme.colors.primary,
    "& > * + *": {
      marginTop: 26,
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
    fontSize: 22,
    padding: 16,
    height: 62,
    borderRadius: 30,
    justifyContent: "space-between",
    "& > span": {
      marginRight: 40,
      fontWeight: 200,
    },
    "& svg": {
      width: 30,
      height: 30,
      marginRight: "0px !important",
    },
  },
  autoCompleteInput: {
    fontSize: 24,
    marginTop: 3,
    "& input": {
      fontSize: 24,
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

export interface ICreateLiquidityPoolFormValues {
  name: string;
  symbol: string;
  about: string;
  fee: number;
  acceptedTokens: string[];
  liquidityPoolType: string;
  platformWhitelist: string[];
  tokenWhitelist: string[];
  allowLeverage: string;
  accepted: boolean;
}

const CreateLiquidityPoolForm = () => {
  const classes = useStyles();
  const initialFormValue: ICreateLiquidityPoolFormValues = {
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
    <div className={classes.root}>
      <Formik
        initialValues={initialFormValue}
        onSubmit={async (values, { setErrors }) => {}}
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
            <div className={classes.contentWrapper}>
              <FormInputRow
                FormHelperTextProps={{
                  error: Boolean(touched.name && errors.name),
                }}
                InputProps={{
                  id: "name",
                  name: "name",
                  onBlur: handleBlur,
                  onChange: handleChange,
                  value: values.name,
                  placeholder: "Small-Cap Growth",
                }}
                helperText={touched.name && errors.name ? errors.name : ""}
                label="Name:"
                labelWidth="280"
              />
              <FormInputRow
                FormHelperTextProps={{
                  error: Boolean(touched.symbol && errors.symbol),
                }}
                InputProps={{
                  id: "symbol",
                  name: "symbol",
                  onBlur: handleBlur,
                  onChange: handleChange,
                  value: values.symbol,
                  placeholder: "SCG",
                }}
                helperText={
                  touched.symbol && errors.symbol ? errors.symbol : ""
                }
                label="Symbol:"
                labelWidth="280"
              />
              <FormInputRow
                FormHelperTextProps={{
                  error: Boolean(touched.about && errors.about),
                }}
                InputProps={{
                  id: "about",
                  name: "about",
                  onBlur: handleBlur,
                  onChange: handleChange,
                  value: values.about,
                  placeholder:
                    "This liquidity pool will invest in altcoins that have huge growth potential, seeking 100 times of return",
                  multiline: true,
                }}
                helperText={touched.about && errors.about ? errors.about : ""}
                inputFullWidth
                label="About:"
                labelWidth="280"
              />
            </div>
            <div className={classes.contentWrapper}>
              <FormInputRow
                FormHelperTextProps={{
                  error: Boolean(touched.fee && errors.fee),
                }}
                InputProps={{
                  id: "fee",
                  name: "fee",
                  onBlur: handleBlur,
                  onChange: handleChange,
                  value: values.fee,
                  placeholder: "0",
                  renderSuffix: () => "%",
                  classes: { input: classes.percentInput },
                  type: "number",
                  inputProps: { min: 0, max: 100 },
                }}
                helperText={touched.fee && errors.fee ? errors.fee : ""}
                label="Fee:"
                labelWidth="280"
              />
              <FormAutocompleteMultipleRow
                AutocompleteProps={{
                  multiple: true,
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
                inputFullWidth
                label="Accepted Tokens:"
                labelWidth="280"
              />
              <FormSelectRow
                FormHelperTextProps={{
                  error: Boolean(
                    touched.liquidityPoolType && errors.liquidityPoolType
                  ),
                }}
                SelectProps={{
                  id: "liquidityPoolType",
                  name: "liquidityPoolType",
                  onBlur: handleBlur,
                  onChange: handleChange,
                  value: values.liquidityPoolType,
                }}
                helperText={
                  touched.liquidityPoolType && errors.liquidityPoolType
                    ? errors.liquidityPoolType
                    : ""
                }
                items={[{ label: "Spot - DEFI", value: "Spot - DEFI" }]}
                label="Liquidity Pool Type:"
                labelWidth="280"
              />
              <FormAutocompleteMultipleRow
                AutocompleteProps={{
                  multiple: true,
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
                inputFullWidth
                label="Accepted Tokens:"
                labelWidth="280"
              />
              <FormAutocompleteMultipleRow
                AutocompleteProps={{
                  multiple: true,
                  id: "Token Whitelist",
                  size: "small",
                  options: [{ title: "All", value: "all" }],
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
                      placeholder="All"
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
                    touched.tokenWhitelist && errors.tokenWhitelist
                  ),
                }}
                helperText={
                  touched.tokenWhitelist && errors.tokenWhitelist
                    ? errors.tokenWhitelist[0]
                    : ""
                }
                inputFullWidth
                label="Token Whitelist:"
                labelWidth="280"
              />
              <FormSelectRow
                FormHelperTextProps={{
                  error: Boolean(touched.allowLeverage && errors.allowLeverage),
                }}
                SelectProps={{
                  id: "allowLeverage",
                  name: "allowLeverage",
                  onBlur: handleBlur,
                  onChange: handleChange,
                  value: values.allowLeverage,
                }}
                helperText={
                  touched.allowLeverage && errors.allowLeverage
                    ? errors.allowLeverage
                    : ""
                }
                items={[
                  { label: "1x", value: "1x" },
                  { label: "3x", value: "3x" },
                  { label: "5x", value: "5x" },
                  { label: "7x", value: "6x" },
                  { label: "10x", value: "10x" },
                ]}
                label="Allow Leverage:"
                labelWidth="280"
              />
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
              disabled={!values.accepted}
              variant="contained"
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateLiquidityPoolForm;
