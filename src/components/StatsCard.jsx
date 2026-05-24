import { TrendingUp } from "lucide-react";

const StatsCard = ({ title, value, growth, icon }) => {
  return (
    <div
      className="
        bg-white/80 dark:bg-[#161f32]/90
        backdrop-blur-md
        border border-slate-200/60 dark:border-slate-800/60
        rounded-3xl
        p-6
        shadow-sm
        hover:shadow-md
        hover:border-slate-300 dark:hover:border-slate-700
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between">
        <div>
          {/* عنوان الكرت التفاعلي */}
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
            {title}
          </p>
          {/* القيمة الرقمية الكبيرة */}
          <h2 className="text-3xl font-bold mt-2.5 text-slate-900 dark:text-white tracking-tight">
            {value}
          </h2>
        </div>

        {/* حاوية الأيقونة الدائرية الناعمة المتكيفة مع الدارك مود */}
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-indigo-50 dark:bg-indigo-950/40
            text-indigo-600 dark:text-indigo-400
            border border-indigo-100/50 dark:border-indigo-900/30
            flex
            items-center
            justify-center
            shadow-sm
          "
        >
          {icon}
        </div>
      </div>

      {/* شريط معلومات النمو السفلي */}
      <div className="flex items-center gap-2 mt-5 border-t border-slate-100 dark:border-slate-800/60 pt-3">
        <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-lg border border-emerald-100 dark:border-emerald-900/20">
          <TrendingUp
            size={14}
            className="text-emerald-600 dark:text-emerald-400"
          />
          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            {growth}
          </span>
        </div>

        <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">
          vs last month
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
