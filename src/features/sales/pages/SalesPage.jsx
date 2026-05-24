import DashboardLayout from "../../../layouts/DashboardLayout";
import OrdersTable from "../components/OrdersTable";
import ExportPDFButton from "../../../components/ExportPDFButton";
import StatsCard from "../../../components/StatsCard"; // استيراد كرت الإحصائيات المطور
import { DollarSign, ShoppingCart, Users, CheckCircle2 } from "lucide-react"; // أيقونات رسمية للبطاقات

const SalesPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto space-y-8 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* Top Header Banner - Title & Export Button Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sales Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage transactions, monitor orders, and download comprehensive
              ledger exports.
            </p>
          </div>

          {/* زر تصدير التقارير في مكان مميز ومحاذي رسمياً */}
          <div className="flex-shrink-0">
            <ExportPDFButton
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              title="Sales Report"
            />
          </div>
        </div>

        {/* Sales Performance Metrics - Core Analytics Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Revenue"
            value="$45,000"
            growth="+14.2%"
            icon={<DollarSign size={20} />}
          />

          <StatsCard
            title="Total Orders"
            value="245"
            growth="+8.3%"
            icon={<ShoppingCart size={20} />}
          />

          <StatsCard
            title="Active Customers"
            value="128"
            growth="+5.1%"
            icon={<Users size={20} />}
          />

          <StatsCard
            title="Completed Orders"
            value="189"
            growth="+11.5%"
            icon={<CheckCircle2 size={20} />}
          />
        </div>

        {/* Data Grid Section - Central Orders Registry Table */}
        <div className="bg-white dark:bg-[#161f32]/90 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-2 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/40">
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Recent Transactions Ledger
            </h2>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
              Live audit view of pending, processing, and finalized store
              receipts.
            </p>
          </div>

          {/* عرض الجدول المطور داخل الحاوية الفخمة */}
          <div className="p-2">
            <OrdersTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalesPage;
