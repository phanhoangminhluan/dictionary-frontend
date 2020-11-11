/* eslint-disable no-undef */
import * as echarts from "echarts";
import React, { memo, useEffect, useState } from "react";
import { compose } from "redux";

const defaultDataSet = [
  ["Jan", 10, 1],
  ["Feb", 20, 3],
  ["Mar", 30, 5],
  ["Apr", 40, 6],
  ["May", 50, 2],
  ["Jun", 60, 5],
  ["Jul", 70, 6],
  ["Aug", 80, 0],
  ["Sep", 90, 7],
  ["Oct", 10, 12],
  ["Nov", 10, 5],
  ["Dev", 22, 3],
];

const setData = (dataSet = defaultDataSet, year = "2020") => {
  const evaluation =
    localStorage.getItem("evaluate") &&
    Array.isArray(JSON.parse(localStorage.getItem("evaluate")))
      ? JSON.parse(localStorage.getItem("evaluate"))
      : [];
  console.log(evaluation);
  evaluation.map((item) => {
    item.feedback.map((eva) => {
      console.log("timeCreated " + eva.timeCreated);
      if (eva.timeCreated.includes(year)) {
        if (eva.timeCreated.includes("Jan")) {
          eva.eva === "negative" ? dataSet[0][1]++ : dataSet[0][2]++;
        } else if (eva.timeCreated.includes("Feb")) {
          eva.eva === "negative" ? dataSet[1][1]++ : dataSet[1][2]++;
        } else if (eva.timeCreated.includes("Mar")) {
          eva.eva === "negative" ? dataSet[2][1]++ : dataSet[2][2]++;
        } else if (eva.timeCreated.includes("Apr")) {
          eva.eva === "negative" ? dataSet[3][1]++ : dataSet[3][2]++;
        } else if (eva.timeCreated.includes("May")) {
          eva.eva === "negative" ? dataSet[4][1]++ : dataSet[4][2]++;
        } else if (eva.timeCreated.includes("Jun")) {
          eva.eva === "negative" ? dataSet[5][1]++ : dataSet[5][2]++;
        } else if (eva.timeCreated.includes("Jul")) {
          eva.eva === "negative" ? dataSet[6][1]++ : dataSet[6][2]++;
        } else if (eva.timeCreated.includes("Aug")) {
          eva.eva === "negative" ? dataSet[7][1]++ : dataSet[7][2]++;
        } else if (eva.timeCreated.includes("Sep")) {
          eva.eva === "negative" ? dataSet[8][1]++ : dataSet[8][2]++;
        } else if (eva.timeCreated.includes("Oct")) {
          eva.eva === "negative" ? dataSet[9][1]++ : dataSet[9][2]++;
        } else if (eva.timeCreated.includes("Nov")) {
          eva.eva === "negative" ? dataSet[10][1]++ : dataSet[10][2]++;
        } else if (eva.timeCreated.includes("Dec")) {
          eva.eva === "negative" ? dataSet[11][1]++ : dataSet[11][2]++;
        }
      }
    });
  });
  console.log(dataSet);
  return dataSet;
};

const setUpOption = (dataSet = defaultDataSet, type = "bar") => {
  return {
    title: {
      text: "Feedback statistic by month",
    },
    tooltip: {},
    xAxis: {
      data: dataSet.map((item) => item[0]),
    },
    yAxis: {},
    series: [
      {
        name: "negative",
        type: type,
        // encode: { x: 0, y: 1 },
        data: dataSet.map((item) => item[1]),
      },
      {
        name: "positive",
        type: "line",
        // encode: { x: 0, y: 2 },
        data: dataSet.map((item) => item[2]),
      },
    ],
  };
};

export const Statistic = () => {
const [dataSet, setDataSet] = useState([
    ["Jan", 0, 0],
    ["Feb", 0, 0],
    ["Mar", 0, 0],
    ["Apr", 3, 5],
    ["May", 0, 0],
    ["Jun", 2, 0],
    ["Jul", 0, 0],
    ["Aug", 0, 0],
    ["Sep", 0, 0],
    ["Oct", 0, 0],
    ["Nov", 0, 0],
    ["Dev", 0, 0],
  ]);

  const setChart = (id = "", type = "line") => {
    // initialize echarts instance with prepared DOM
    var myChart = echarts.init(document.getElementById(id));
    
    myChart.setOption(setUpOption(dataSet, type));
  };
  useEffect(() => {
    setDataSet(setData(dataSet, 2020));
    setChart("chart", 'bar');
  }, []);

  return <div id="chart" style={{ width: "100%", height: "100%" }}></div>;
};
export default compose(memo)(Statistic);