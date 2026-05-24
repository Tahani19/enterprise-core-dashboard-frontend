import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 7000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 9000 },
  { month: "May", revenue: 12000 },
  { month: "Jun", revenue: 15000 },
];

// مفسر ومحدد تفاصيل المخطط المنبثق بدقة احترافية
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 p-3.5 rounded-2xl shadow-xl transition-all duration-200">
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {payload[0].payload.month} Performance
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          <p className="text-base font-black text-slate-900 dark:text-white">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const AnalyticsChart = () => {
  // دالة لتنسيق الأرقام الكبيرة على المحور العمودي تلقائياً (مثال: 5000 يصبح 5K)
  const formatYAxis = (tickItem) => {
    return tickItem === 0 ? "0" : `${tickItem / 1000}K`;
  };

  return (
    <div
      className="
        bg-white dark:bg-[#161f32]/90
        border border-slate-200/60 dark:border-slate-800/80
        rounded-3xl
        p-6
        shadow-sm
        transition-colors
        duration-300
      "
    >
      {/* الهيدر والمؤشرات العلوية للمخطط */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Revenue Analytics
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            Gross corporate earnings trend plotted across active quarters.
          </p>
        </div>

        {/* دليل إرشادي صغير (Legend) يضفي طابعاً رسمياً */}
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 block" />
          <span>Gross Revenue</span>
        </div>
      </div>

      {/* منطقة الرسم البياني */}
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              {/* تعريف التدرج اللوني تحت المنحنى للـ Light والـ Dark Mode */}
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            {/* شبكة أفقية ناعمة جداً ومتقطعة لخلفية المخطط */}
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="currentColor"
              className="text-slate-100 dark:text-slate-800/50"
            />

            {/* المحور الأفقي (الأشهر) */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              dy={12}
              stroke="currentColor"
              className="text-slate-400 dark:text-slate-500 text-xs font-semibold"
            />

            {/* المحور العمودي الجديد (المبالغ المالية) لشرعية القراءة */}
            <YAxis
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              dx={-8}
              stroke="currentColor"
              className="text-slate-400 dark:text-slate-500 text-xs font-semibold"
            />

            {/* التول تيب مع تخصيص الـ Crosshair المظلل التفاعلي */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: "rgba(99, 102, 241, 0.04)",
                stroke: "rgba(99, 102, 241, 0.15)",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />

            {/* المنحنى المساحي المطور المتوهج بانحناءات دائرية ناعمة */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#revenueGradient)"
              dot={{ r: 4, strokeWidth: 2, fill: "#161f32", stroke: "#4f46e5" }}
              activeDot={{
                r: 6,
                strokeWidth: 4,
                fill: "#4f46e5",
                stroke: "#ffffff",
                className: "shadow-lg dark:stroke-[#161f32]",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
