import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Boxes,
  ArrowUpRight,
  Calendar,
} from "lucide-react";

import StatsCard from "../components/StatsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import ActivityFeed from "../components/ActivityFeed";
import KpiCard from "../components/KpiCard";

import { getDashboardStats } from "../features/dashboard/dashboardAPI";
import { setStats } from "../features/dashboard/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { employees } = useSelector((state) => state.employees) || {};
  const { products } = useSelector((state) => state.products) || {};
  const { stats } = useSelector((state) => state.dashboard) || {};

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        dispatch(setStats(data));
      } catch (error) {
        console.error("Dashboard Sync Error:", error);
      }
    };

    fetchStats();
  }, [dispatch]);

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-2 border-slate-400 dark:border-slate-600 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-xs font-medium text-slate-500 mt-3 tracking-wide">
            Loading dashboard analytics...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto space-y-8 text-slate-800 dark:text-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-black">
              Overview Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Real-time monitoring control center for enterprise assets and
              performance.
            </p>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm">
            <Calendar size={14} className="text-slate-400" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value={`$${(stats?.totalRevenue ?? 45000).toLocaleString()}`}
            growth="+18.4%"
            icon={
              <DollarSign
                size={20}
                className="text-indigo-600 dark:text-indigo-400"
              />
            }
          />

          <StatsCard
            title="Total Employees"
            value={employees?.length ?? stats?.totalEmployees ?? 0}
            growth="+6.2%"
            icon={
              <Users size={20} className="text-slate-600 dark:text-slate-400" />
            }
          />

          <StatsCard
            title="Inventory Items"
            value={products?.length ?? stats?.totalProducts ?? 0}
            growth="+12.1%"
            icon={
              <Boxes size={20} className="text-slate-600 dark:text-slate-400" />
            }
          />

          <StatsCard
            title="Total Orders"
            value={stats?.totalOrders ?? "2,450"}
            growth="+22.8%"
            icon={
              <ShoppingCart
                size={20}
                className="text-slate-600 dark:text-slate-400"
              />
            }
          />
        </div>

        <div className="bg-slate-50 dark:bg-[#131b2e] border border-slate-200/80 dark:border-slate-800/70 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Key Performance Indicators (KPI)
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                Consolidated ledger status indicators.
              </p>
            </div>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-1">
              Active Sync <ArrowUpRight size={12} />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="HR Database"
              value={`${stats?.totalEmployees ?? 0} Members Registered`}
            />

            <KpiCard
              title="Warehouse Ledger"
              value={`${stats?.totalProducts ?? 0} Active SKUs`}
            />

            <KpiCard
              title="Client Base"
              value={`${stats?.totalCustomers ?? 0} Portfolios`}
            />

            <KpiCard
              title="Gross Earnings"
              value={`$${(stats?.totalRevenue ?? 0).toLocaleString()}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <AnalyticsChart />
          </div>

          <div className="lg:col-span-1 bg-white dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
