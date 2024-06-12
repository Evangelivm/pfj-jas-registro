"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);
ChartJS.defaults.color = "#fff";

function Dough({ info }) {
  const data = {
    labels: ["Cancelados", "Confirmados", "Contactados"],
    datasets: [
      {
        labels: ["Cancelados", "Confirmados", "Contactados"],
        data: [info.cancelados, info.confirmados, info.contactados],
        backgroundColor: [
          "rgb(239, 68, 68)",
          "rgb(22, 163, 74)",
          "rgb(202, 138, 4)",
        ],
        borderColor: ["rgb(0, 47, 86)", "rgb(0, 47, 86)", "rgb(0, 47, 86)"],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
  };
  return <Doughnut data={data} config={config} />;
}

export default Dough;
