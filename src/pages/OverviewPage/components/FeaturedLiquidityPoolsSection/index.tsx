import { Grid, Typography, makeStyles } from "@material-ui/core";
import { FeaturedLiquidityPoolCard } from "components";
import React from "react";
import { IFeaturedLiquidityPool } from "types";

const useStyles = makeStyles((theme) => ({
  root: {},

  title: {
    fontSize: 32,
    color: theme.colors.default,
    fontWeight: "bold",
  },
  content: {
    paddingTop: 24,
  },
}));

const mockFeaturedLiquidityPools: IFeaturedLiquidityPool[] = [
  {
    id: "123",
    address: "234",
    title: "COOK 100",
    returns24h: 8.7,
    riskIndex: "8/10",
    sector: "Spot - Composite",
  },
  {
    id: "456",
    address: "35",
    title: "Smart Contract Liquidity Pool",
    returns24h: -2,
    riskIndex: "10/10",
    sector: "Smart Contract",
  },
  {
    id: "35",
    address: "24",
    title: "Defi Liquidity Pool",
    returns24h: 15,
    riskIndex: "7/10",
    sector: "Stablecoins",
  },
];

export const FeaturedLiquidityPoolsSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={6}>
          {mockFeaturedLiquidityPools.map((pool) => (
            <Grid item key={pool.id} lg={4} md={4} xs={6}>
              <FeaturedLiquidityPoolCard data={pool} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
