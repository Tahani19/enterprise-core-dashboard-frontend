import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../productAPI";
import { deleteProductState } from "../productSlice";
import EditProductModal from "./EditProductModal";
import toast from "react-hot-toast";

const ProductTable = ({ products }) => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      dispatch(deleteProductState(id));
      toast.success("Product deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  // دالة ذكية لتنسيق حالة المخزون (Stock Level)
  const getStockStyles = (stock) => {
    if (stock === 0) {
      return "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50";
    }
    if (stock <= 10) {
      return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50";
    }
    return "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
              <tr>
                <th className="p-4 pl-6 text-xs font-bold uppercase tracking-wider">
                  Product Name
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Category
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Stock
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Price
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 pr-6 text-xs font-bold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {products?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors duration-200"
                >
                  {/* Product Title */}
                  <td className="p-4 pl-6 font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate text-sm">
                    {item.name}
                  </td>

                  {/* Category */}
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                    {item.category || "General"}
                  </td>

                  {/* Stock Level */}
                  <td className="p-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStockStyles(item.stock)}`}
                    >
                      {item.stock === 0
                        ? "Out of stock"
                        : `${item.stock} available`}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    $
                    {item.price?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50">
                      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-emerald-500" />
                      Active
                    </span>
                  </td>

                  {/* Control Actions Buttons */}
                  <td className="p-4 pr-6 text-right">
                    <div className="inline-flex items-center gap-2">
                      {/* Edit button */}
                      <button
                        onClick={() => handleEditClick(item)}
                        type="button"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-150"
                        title="Edit Product"
                      >
                        <Pencil size={15} />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        type="button"
                        className="p-1.5 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-150"
                        title="Delete Product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {(!products || products.length === 0) && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-12 text-center text-sm text-slate-400 dark:text-slate-500"
                  >
                    No products discovered in your inventory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditProductModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductTable;
