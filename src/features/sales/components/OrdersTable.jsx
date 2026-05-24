import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../salesAPI";
import { setOrders } from "../salesSlice";

const OrdersTable = ({ orders }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await getSales();
      console.log(data, "data");
      dispatch(setOrders(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusStyles = (status) => {
    const normalizeStatus = status?.toLowerCase() || "completed";

    switch (normalizeStatus) {
      case "pending":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50";
      case "cancelled":
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50";
      default:
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
      {/* Table Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sales Orders
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Recent sales transactions and fulfillment updates
          </p>
        </div>
      </div>

      {/* Table Responsive Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Head */}
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <tr>
              <th className="p-4 pl-6 text-xs font-bold uppercase tracking-wider">
                Product
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider">
                Quantity
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider">
                Total Amount
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider">
                Date
              </th>
              <th className="p-4 pr-6 text-xs font-bold uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {orders?.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors duration-200"
              >
                {/* Product Name */}
                <td className="p-4 pl-6 font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate text-sm">
                  {order?.product?.name || "N/A"}
                </td>

                {/* Quantity */}
                <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {order.quantity}
                </td>

                {/* Total */}
                <td className="p-4 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  $
                  {order.total?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>

                {/* Date */}
                <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                  {order.date
                    ? new Date(order.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </td>

                {/* Status Badge */}
                <td className="p-4 pr-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide ${getStatusStyles(order.status)}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
                    {order.status || "Completed"}
                  </span>
                </td>
              </tr>
            ))}

            {(!orders || orders.length === 0) && (
              <tr>
                <td
                  colSpan="5"
                  className="p-12 text-center text-sm text-slate-400 dark:text-slate-500"
                >
                  No sales orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
