import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

type Props = {
  stats: {
    totalJobs: number;
    totalOffers: number;
    totalRecruiters: number;
    scamJobs: number;
    avgTrustScore: number;
  };
};

function DashboardCharts({ stats }: Props) {

  const safeJobs = Math.max(0, stats.totalJobs - stats.scamJobs);

  const pieData = {
    labels: ["Safe Jobs", "Scam Jobs"],
    datasets: [
      {
        data: [safeJobs, stats.scamJobs],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };

  const barData = {
  labels: [
    "Verified Jobs",
    "Offer Letters",
    "Recruiters",
    "Scam Jobs",
  ],

  datasets: [
    {
      label: "Platform Statistics",
      data: [
        stats.totalJobs,
        stats.totalOffers,
        stats.totalRecruiters,
        stats.scamJobs,
      ],

      backgroundColor: [
        "#22c55e",
        "#3b82f6",
        "#a855f7",
        "#ef4444",
      ],

      borderRadius: 10,
    },
  ],
};
  return (

    <div className="grid lg:grid-cols-2 gap-8 mt-10">

      <div className="bg-[#111827] rounded-3xl border border-gray-800 p-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Risk Distribution
        </h2>

        <Pie data={pieData} />

      </div>

      <div className="bg-[#111827] rounded-3xl border border-gray-800 p-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Average Trust Score
        </h2>

        <Bar
  data={barData}
  options={{
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  }}
/>

      </div>

    </div>

  );
}

export default DashboardCharts;