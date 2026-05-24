import { useForm }
from "react-hook-form";

import { X }
from "lucide-react";

import {
  createProduct,
} from "../productAPI";

import {
  useDispatch,
} from "react-redux";

import {
  addProduct,
} from "../productSlice";

import toast
from "react-hot-toast";

const AddProductModal = ({
  isOpen,
  onClose,
}) => {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();



  const onSubmit = async (
    data
  ) => {

    try {

      const newProduct =
        await createProduct(data);

      dispatch(
        addProduct(newProduct)
      );

      toast.success(
        "Product created"
      );

      reset();

      onClose();

    } catch (error) {

      console.log(error);

    }
  };



  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[500px] rounded-2xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Add Product
        </h2>



        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Product Name"
            className="w-full border p-3 rounded-xl"
            {...register("name")}
          />



          <input
            type="text"
            placeholder="SKU"
            className="w-full border p-3 rounded-xl"
            {...register("sku")}
          />



          <input
            type="text"
            placeholder="Category"
            className="w-full border p-3 rounded-xl"
            {...register("category")}
          />



          <input
            type="number"
            placeholder="Price"
            className="w-full border p-3 rounded-xl"
            {...register("price")}
          />



          <input
            type="number"
            placeholder="Stock"
            className="w-full border p-3 rounded-xl"
            {...register("stock")}
          />



          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
            Create Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddProductModal;