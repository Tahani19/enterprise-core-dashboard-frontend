import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../layouts/DashboardLayout";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import { getProducts } from "../productAPI";
import { setProducts } from "../productSlice";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages } = useSelector(
    (state) => state.products,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(page, limit, search);
        dispatch(setProducts(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [dispatch, page, search]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-1 py-4 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-black">
              Inventory Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Manage products, track stock levels, and monitor warehouse value
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm focus:outline-none"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          {/* Total Products */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total Products
            </p>
            <h2 className="text-2xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
              {products?.length || 0}
            </h2>
          </div>

          {/* Low Stock Counter */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Low Stock Alert
            </p>
            <h2
              className={`text-2xl font-black mt-2 tracking-tight ${
                products?.filter((p) => p.stock < 10).length > 0
                  ? "text-rose-500 dark:text-rose-400"
                  : "text-emerald-500"
              }`}
            >
              {products?.filter((p) => p.stock < 10).length || 0}
            </h2>
          </div>

          {/* Inventory Value */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Inventory Total Value
            </p>
            <h2 className="text-2xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
              $
              {(
                products?.reduce(
                  (total, product) => total + product.price * product.stock,
                  0,
                ) || 0
              ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
          </div>

          {/* Categories Count */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total Categories
            </p>
            <h2 className="text-2xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
              {products ? new Set(products.map((p) => p.category)).size : 0}
            </h2>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="relative mb-6 max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search through products inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>

        {/* Products Grid Table Component */}
        <ProductTable products={products} />

        {/* Premium Pagination System */}
        {/* Premium Pagination System */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-xs font-bold px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl border border-transparent dark:border-slate-700/60">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Modal Window Wrapper */}
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
