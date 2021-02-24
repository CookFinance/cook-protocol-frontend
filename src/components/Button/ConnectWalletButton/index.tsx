import { Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 58,
    backgroundColor: theme.colors.default,
    border: `1px solid ${theme.colors.gray20}`,
    "& span": { flex: 1, textAlign: "left" },
    "& svg": {
      height: theme.spacing(3.5),
      width: theme.spacing(3.5),
    },
  },
  label: {
    textTransform: "none",
    fontSize: 16,
    lineHeight: "19px",
  },
}));

interface IProps {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  text: string;
  icon: React.ElementType;
}

export const ConnectWalletButton = (props: IProps) => {
  const classes = useStyles();
  const { disabled = false, icon: Icon, onClick, text } = props;
  return (
    <Button
      className={clsx(classes.root, props.className)}
      classes={{ label: classes.label }}
      disabled={disabled}
      fullWidth
      onClick={onClick}
      variant="contained"
    >
      <span>{text}</span>

      <Icon />
    </Button>
  );
};
