import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { getToken } from "config/network";
import { BigNumber } from "ethers";
import { transparentize } from "polished";
import React from "react";
import { IPool, KnownToken } from "types";

interface Data extends IPool {
  returns24h: number;
  price: number;
  valuation: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (typeof a === "object") {
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | BigNumber | any },
  b: { [key in Key]: number | string | BigNumber | any }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Fund",
  },
  { id: "symbol", numeric: false, label: "Symbol" },
  { id: "tokens", numeric: false, label: "Assets" },
  { id: "price", numeric: true, label: "Price" },
  { id: "returns24h", numeric: true, label: "Return (24h)" },
  { id: "valuation", numeric: true, label: "Valuation" },
  { id: "assetType", numeric: true, label: "Asset Type" },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onRequestSort, order, orderBy } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            align={headCell.numeric ? "right" : "left"}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    table: {
      "& tr": {
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
          opacity: 0.7,
        },
        "& td": {
          borderBottom: "none",
          backgroundColor: theme.colors.default,
          fontSize: 20,
          lineHeight: "26px",
          "& span": {
            borderRadius: 2,
            display: "inline-flex",
            alignItems: "center",
            padding: "9px 16px",
          },
        },
        "&.positive": {
          "& td": {
            "&:first-child": {
              borderLeft: `5px solid ${theme.colors.success}`,
              borderRadius: "4px 0 0 4px",
            },
            "&:last-child": {
              borderRadius: "0 4px 4px 0",
            },
          },
          "& span": {
            color: theme.colors.success,
            backgroundColor: transparentize(0.8, theme.colors.success),
          },
        },
        "&.negative": {
          "& td": {
            "&:first-child": {
              borderLeft: `5px solid ${theme.colors.warn}`,
              borderRadius: "4px 0 0 4px",
            },
            "&:last-child": {
              borderRadius: "0 4px 4px 0",
            },
          },
          "& span": {
            color: theme.colors.warn,
            backgroundColor: transparentize(0.8, theme.colors.warn),
          },
        },
      },
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    icon: {
      width: 16,
      height: 16,
      "& svg": {
        width: 16,
        height: 16,
      },
      marginRight: 3,
    },
  })
);

interface IProps {
  rows: Data[];
}

export function SortableFundsTable(props: IProps) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const { rows } = props;
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          aria-label="enhanced table"
          aria-labelledby="tableTitle"
          className={classes.table}
        >
          <EnhancedTableHead
            classes={classes}
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
          />
          <TableBody>
            {stableSort<Data>(rows, getComparator(order, orderBy)).map(
              (row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover key={row.name} tabIndex={-1}>
                    <TableCell
                      component="th"
                      id={labelId}
                      padding="none"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.symbol}</TableCell>
                    <TableCell align="right">
                      {Object.keys(row.tokens)
                        .slice(0, 8)
                        .map((key) => {
                          const token = getToken(key as KnownToken);
                          const { icon: Icon } = token;
                          return (
                            <span className={classes.icon} key={token.name}>
                              <Icon />
                            </span>
                          );
                        })}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.returns24h}</TableCell>
                    <TableCell align="right">{row.valuation}</TableCell>
                    <TableCell align="right">{row.assetType}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}