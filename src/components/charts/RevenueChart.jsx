import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [

  {
    month: "Jan",
    revenue: 4000,
  },

  {
    month: "Feb",
    revenue: 7000,
  },

  {
    month: "Mar",
    revenue: 5000,
  },

  {
    month: "Apr",
    revenue: 9000,
  },
];

const RevenueChart = () => {

  return (

    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">

      <h2 className="text-xl font-bold mb-5">
        Revenue Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <AreaChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;