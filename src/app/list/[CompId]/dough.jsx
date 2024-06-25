"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);
ChartJS.defaults.color = "#fff";

function Dough({ info }) {
  const data = {
    labels: ["Pendientes", "Registrados"],
    datasets: [
      {
        labels: ["Pendientes", "Registrados"],
        data: [info.pendientes, info.registrados],
        backgroundColor: ["rgb(239, 68, 68)", "rgb(22, 163, 74)"],
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
