import { postTypes } from "@/data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = ({ salesCount }: { salesCount: number[] }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: [13, 34, 27, 0, 0, 0, 10, 8, 15, 18, 14, 26],
        backgroundColor: "#01B4BC",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default SalesGraph;
