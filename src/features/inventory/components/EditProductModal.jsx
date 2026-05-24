import {
  useForm,
} from "react-hook-form";

import {
  useEffect,
} from "react";

import { X }
from "lucide-react";

import {
  updateProduct,
} from "../productAPI";

import {
  useDispatch,
} from "react-redux";

import {
  updateProductState,
} from "../productSlice";

import toast
from "react-hot-toast";

const EditProductModal = ({
  isOpen,
  onClose,
  product,
}) => {

  const dispatch =
    useDispatch();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();



  useEffect(() => {

    if (product) {
      reset(product);
    }

  }, [product, reset]);



  const onSubmit =
  async (data) => {

    try {

      const updatedProduct =
        await updateProduct(
          product._id,
          data
        );

      dispatch(
        updateProductState(
          updatedProduct
        )
      );

      toast.success(
        "Product updated"
      );

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
          Edit Product
        </h2>



        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <input
            className="w-full border p-3 rounded-xl"
            {...register("name")}
          />

          <input
            className="w-full border p-3 rounded-xl"
            {...register("sku")}
          />

          <input
            className="w-full border p-3 rounded-xl"
            {...register("category")}
          />

          <input
            className="w-full border p-3 rounded-xl"
            {...register("price")}
          />

          <input
            className="w-full border p-3 rounded-xl"
            {...register("stock")}
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProductModal;