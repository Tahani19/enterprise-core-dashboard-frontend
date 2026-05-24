const KpiCard = ({ title, value }) => {
  return (
    <div
      className="
        bg-white dark:bg-[#161f32]/90 
        border border-slate-200/60 dark:border-slate-800/60 
        p-6 
        rounded-2xl 
        shadow-sm 
        transition-all 
        duration-300
      "
    >
      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
        {title}
      </h3>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {value}
      </h1>
    </div>
  );
};

export default KpiCard;
