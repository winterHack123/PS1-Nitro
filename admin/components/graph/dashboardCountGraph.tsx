import { postTypes } from '@/data';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//       {postsCount[index]}

const CountGraph = ({ postsCount }: { postsCount: number[] }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels = postTypes.map((ele) => ele.title);

  const data = {
    labels,
    datasets: [
      {
        label: 'Count',
        data: postsCount,
        backgroundColor: '#01B4BC',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default CountGraph;
