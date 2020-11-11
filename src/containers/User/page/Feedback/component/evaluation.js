import { EVALUATE_FEEDBACK } from "utils/apiEndpoint";
import { get } from "utils/request";
import moment from "moment";
export const evaluateFeedback = async (data = "") => {
  return await get(
    EVALUATE_FEEDBACK,
    {
      //   data: data,
    },
    { text: data },
    {}
  );
};

const defaultDataSet = [
  ["Jan", 0, 0],
  ["Feb", 0, 0],
  ["Mar", 0, 0],
  ["Apr", 0, 0],
  ["May", 0, 0],
  ["Jun", 0, 0],
  ["Jul", 0, 0],
  ["Aug", 0, 0],
  ["Sep", 0, 0],
  ["Oct", 0, 0],
  ["Nov", 0, 0],
  ["Dev", 0, 0],
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
export const storeFeedbackEvaluation = async (id = 0, data = "") => {
  const evaluation = await evaluateFeedback(data);
  const evaluationData = evaluation.data;
  console.log(evaluationData);
  let evaluate = [
    {
      id: id,
      feedback: [
        {
          data: data,
          eva: evaluationData ?? "negative",
          timeCreated: moment().format("MMM Do YYYY").toString(),
        },
      ],
    },
  ];
  if (
    localStorage.getItem("evaluate") &&
    Array.isArray(JSON.parse(localStorage.getItem("evaluate")))
  ) {
    // alert("run");
    const localDB = JSON.parse(localStorage.getItem("evaluate"));
    console.log(localDB);
    evaluate = localDB.filter((item) => {
      if (item.id === id) {
        item.feedback.push({
          data: data,
          eva: evaluationData ?? "negative",
          timeCreated: moment().format("MMM Do YYYY").toString(),
        });
      }
      return item;
    });
  }
  console.log(...evaluate);
  setData();
  localStorage.setItem("evaluate", JSON.stringify(evaluate));
};
