import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Download,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import DashboardLayout from "../../../layouts/DashboardLayout";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 7000 },
  { month: "Jun", sales: 6500 },
];

const pieData = [
  { name: "Sales", value: 45 },
  { name: "Inventory", value: 30 },
  { name: "Employees", value: 25 },
];

// لوحة ألوان عصرية وحيوية تتوافق مع الـ Light والـ Dark Mode
const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 p-1 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-black">
              Reports Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Business analytics & statistics overview
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm focus:outline-none">
            <Download size={16} />
            Export PDF
          </button>
        </div>

        {/* Analytics Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Total Revenue */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Revenue
                </p>
                <h2 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white tracking-tight">
                  $48,900
                </h2>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-xl">
                <DollarSign
                  size={22}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
            </div>
          </div>

          {/* Employees */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Employees
                </p>
                <h2 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white tracking-tight">
                  24
                </h2>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl">
                <Users
                  size={22}
                  className="text-emerald-500 dark:text-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Products
                </p>
                <h2 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white tracking-tight">
                  1,240
                </h2>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl">
                <Package
                  size={22}
                  className="text-amber-500 dark:text-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Growth */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Growth
                </p>
                <h2 className="text-2xl font-bold mt-2 text-emerald-600 dark:text-emerald-400 tracking-tight">
                  +18%
                </h2>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl">
                <TrendingUp
                  size={22}
                  className="text-emerald-600 dark:text-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Sales Analytics Bar Chart */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border border-slate-100 dark:border-slate-800 transition-all">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Sales Analytics
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Monthly revenue overview
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                <BarChart3
                  size={18}
                  className="text-slate-700 dark:text-slate-300"
                />
              </div>
            </div>

            <div className="w-full text-xs">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    stroke="currentColor"
                    className="text-slate-400 dark:text-slate-500"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    stroke="currentColor"
                    className="text-slate-400 dark:text-slate-500"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(15, 23, 42)",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                    }}
                    cursor={{ fill: "rgba(99, 102, 241, 0.04)" }}
                  />
                  <Bar
                    dataKey="sales"
                    fill="#6366f1"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* System Overview Pie Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border border-slate-100 dark:border-slate-800 transition-all flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                System Overview
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Resource distribution status
              </p>
            </div>

            <div className="w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(15, 23, 42)",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* النص المتمركز بداخل الـ Donut Chart ليعطي طابعاً احترافياً */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  100%
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Total Asset
                </span>
              </div>
            </div>

            {/* مفاتيح الخريطة (Legends) بتنسيق رائع */}
            <div className="space-y-2.5 mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/60">
              {pieData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-md"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-slate-400">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
