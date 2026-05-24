import {
  UserPlus,
  PackageCheck,
  ShoppingBag,
  RefreshCw,
  Clock,
} from "lucide-react";

const activities = [
  {
    id: 1,
    text: "New employee added to HR module",
    time: "2 mins ago",
    type: "employee",
    icon: <UserPlus size={14} />,
    color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40",
  },
  {
    id: 2,
    text: "Product stock updated in Warehouse A",
    time: "15 mins ago",
    type: "inventory",
    icon: <PackageCheck size={14} />,
    color:
      "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40",
  },
  {
    id: 3,
    text: "New sales invoice created #4920",
    time: "1 hour ago",
    type: "order",
    icon: <ShoppingBag size={14} />,
    color:
      "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40",
  },
  {
    id: 4,
    text: "Global Inventory synced with central servers",
    time: "3 hours ago",
    type: "sync",
    icon: <RefreshCw size={14} className="animate-spin-slow" />,
    color:
      "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/40",
  },
];

const ActivityFeed = () => {
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
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          Recent Activity
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
          Real-time system audit logs and automated events.
        </p>
      </div>

      <div className="relative pl-1">
        <div className="absolute left-[19px] top-3 bottom-3 w-[2px] bg-slate-100 dark:bg-slate-800/60 pointer-events-none" />

        <div className="space-y-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="relative flex items-start gap-4 group"
            >
              <div
                className={`
                  relative z-10
                  w-[38px] h-[38px]
                  rounded-xl
                  flex items-center justify-center
                  border border-transparent dark:border-slate-800/40
                  shadow-inner
                  flex-shrink-0
                  transition-transform duration-300 group-hover:scale-110
                  ${activity.color}
                `}
              >
                {activity.icon}
              </div>

              <div className="flex-1 min-w-0 pt-0.5 pb-2 border-b border-slate-100 dark:border-slate-800/40 group-last:border-0">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors group-hover:text-slate-900 dark:group-hover:text-white line-clamp-2">
                    {activity.text}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[11px] font-medium mt-1">
                  <Clock size={11} />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
