import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import EditEmployeeModal from "./EditEmployeeModal";
import toast from "react-hot-toast";
import { deleteEmployee } from "../employeeAPI";
import { deleteEmployeeState } from "../employeeSlice";

const EmployeeTable = ({ employees, user }) => {
  const dispatch = useDispatch();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );
    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);
      dispatch(deleteEmployeeState(id));
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete employee");
    }
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditOpen(true);
  };

  const getRoleStyles = (role) => {
    const normalizeRole = role?.toLowerCase() || "user";
    if (normalizeRole === "admin") {
      return "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200/40 dark:border-purple-900/50";
    }
    return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200/40 dark:border-indigo-900/50";
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
        {/* Card Title Box */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Employees Directory
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
              Manage team members, roles, and department access control
            </p>
          </div>
        </div>

        {/* Responsive Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
              <tr>
                <th className="p-4 pl-6 text-xs font-bold uppercase tracking-wider">
                  Employee
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Department
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Role
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Salary
                </th>
                <th className="p-4 pr-6 text-xs font-bold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {employees?.map((employee) => (
                <tr
                  key={employee._id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors duration-200"
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={employee.image || "https://i.pravatar.cc/150"}
                        alt={employee.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                      />
                      <div className="max-w-[180px] truncate">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                          {employee.name}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {employee.department || "N/A"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${getRoleStyles(employee.role)}`}
                    >
                      {employee.role}
                    </span>
                  </td>

                  <td className="p-4 text-sm font-bold text-slate-900 dark:text-slate-200">
                    $
                    {employee.salary?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(employee)}
                        type="button"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-150"
                        title="Edit Details"
                      >
                        <Pencil size={15} />
                      </button>

                      {/* Admin-only Delete Button */}
                      {user?.role === "Admin" && (
                        <button
                          onClick={() => handleDelete(employee._id)}
                          type="button"
                          className="p-1.5 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-150"
                          title="Remove Employee"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {(!employees || employees.length === 0) && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-12 text-center text-sm text-slate-400 dark:text-slate-500"
                  >
                    No active team members registered.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditEmployeeModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        employee={selectedEmployee}
      />
    </>
  );
};

export default EmployeeTable;
