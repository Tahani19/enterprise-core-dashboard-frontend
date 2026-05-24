import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createEmployee } from "../employeeAPI";
import { addEmployee } from "../employeeSlice";

const AddEmployeeModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const newEmployee = await createEmployee(data);
      dispatch(addEmployee(newEmployee));

      // تصحيح رسالة النجاح هنا لتصبح مناسبة لعملية الإضافة
      toast.success("Employee created successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        toast.error(
          "Access Denied: You do not have the required permissions to manage employee records.",
          { duration: 4000, position: "top-center" },
        );
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      {/* حاوية الـ Modal المتكيفة مع الدارك مود والمنحنيات الناعمة */}
      <div className="bg-white dark:bg-[#161f32] w-full max-w-[500px] rounded-3xl p-6 md:p-8 relative border border-slate-200/60 dark:border-slate-800/80 shadow-2xl transition-colors duration-300">
        {/* زر الإغلاق الدائري الأنيق */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-700 dark:hover:text-slate-200 transition-all disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {/* عنوان الـ Modal */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Add Employee
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
            Register a new team node into the consolidated database grid.
          </p>
        </div>

        {/* حقول الإدخال */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Employee Name"
              required
              className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              {...register("name")}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              {...register("email")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Role"
              required
              className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              {...register("role")}
            />

            <input
              type="text"
              placeholder="Department"
              required
              className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              {...register("department")}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Salary (USD)"
              required
              className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              {...register("salary")}
            />
          </div>

          {/* زر الإنشاء مع مؤشر التحميل والتأثيرات التفاعلية */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Creating Node...</span>
              </>
            ) : (
              <span>Create Employee</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
