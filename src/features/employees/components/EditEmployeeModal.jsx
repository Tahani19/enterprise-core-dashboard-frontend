import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { X } from "lucide-react";

import {
  updateEmployee,
} from "../employeeAPI";

import { useDispatch } from "react-redux";

import {
  updateEmployeeState,
} from "../employeeSlice";

const EditEmployeeModal = ({
  isOpen,
  onClose,
  employee,
}) => {

  const dispatch = useDispatch();

const {
  register,
  handleSubmit,
  reset,
} = useForm();

useEffect(() => {

  if (employee) {
    reset(employee);
  }

}, [employee, reset]);



  const onSubmit = async (data) => {

    try {

      const updatedEmployee =
        await updateEmployee(
          employee._id,
          data
        );

      dispatch(
        updateEmployeeState(
          updatedEmployee
        )
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
          Edit Employee
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
            {...register("email")}
          />

          <input
            className="w-full border p-3 rounded-xl"
            {...register("role")}
          />

          <input
            className="w-full border p-3 rounded-xl"
            {...register("department")}
          />

          <input
            className="w-full border p-3 rounded-xl"
            {...register("salary")}
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
};

export default EditEmployeeModal;