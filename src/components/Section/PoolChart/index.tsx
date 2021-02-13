import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import mockData from "config/chartmock.json";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    boxShadow: "0px 4px 6px 1px rgba(13, 21, 45, 0.5)",
    padding: "40px 48px",
  },
  chart: {
    marginTop: 20,
  },
}));

interface IProps {
  className?: string;
}

export const PoolChart = (props: IProps) => {
  const classes = useStyles();

  const options: Highcharts.Options = {
    chart: {
      zoomType: "x",
      backgroundColor: "#0000",
    },
    title: {
      text: " ",
    },
    subtitle: {
      text: document.ontouchstart === undefined ? "" : "",
    },
    xAxis: {
      type: "datetime",
      gridLineColor: "#0000",
      lineColor: "#0000",
      tickColor: "#0000",
    },
    yAxis: {
      title: {
        text: "",
      },
      gridLineColor: "#0000",
    },
    tooltip: {
      split: true,
    },

    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },

    navigator: {
      outlineWidth: 0,
      handles: {
        borderColor: "#0000",
      },
    },

    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "#60E16088"],
            [1, "#60E16000"],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        lineColor: "#60E160",
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        type: "area",
        name: "",
        data: mockData,
      },
    ],
  };

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.chart}>
        <HighchartsReact highCharts={Highcharts} options={options} />
      </div>
    </div>
  );
};
