import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", scans: 90 },
  { month: "Feb", scans: 120 },
  { month: "Mar", scans: 160 },
  { month: "Apr", scans: 210 },
  { month: "May", scans: 260 },
  { month: "Jun", scans: 320 },
];

function DetectionChart() {
  return (
    <div className="bg-[#111827] rounded-2xl border border-gray-800 p-8">

      <h2 className="text-2xl font-bold mb-8">
        AI Detection Statistics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <Tooltip />
          <Bar
            dataKey="scans"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default DetectionChart;