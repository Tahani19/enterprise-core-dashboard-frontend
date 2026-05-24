import {
  PieChart,
  Pie,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Completed",
    value: 80,
  },

  {
    name: "Pending",
    value: 20,
  },
];

const OrdersPieChart = () => {

  return (

    <PieChart
      width={400}
      height={300}
    >

      <Pie
        data={data}
        dataKey="value"
        outerRadius={100}
      />

      <Tooltip />

    </PieChart>
  );
};

export default
OrdersPieChart;