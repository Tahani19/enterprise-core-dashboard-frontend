import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../layouts/DashboardLayout";
import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeModal from "../components/AddEmployeeModal";
import { getEmployees } from "../employeeAPI";
import { setEmployees } from "../employeeSlice";
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  const { employees } = useSelector((state) => state.employees);
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // تصفية الموظفين بناءً على البحث والمنشأة / القسم
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All"
        ? true
        : employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  // حسابات الـ Pagination الداخلية
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );
  const totalPages =
    Math.ceil(filteredEmployees.length / employeesPerPage) || 1;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        dispatch(setEmployees(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, [dispatch]);

  // لإعادة تعيين الصفحة إلى 1 عند تغيير الفلاتر أو البحث
  useEffect(() => {
    setCurrentPage(1);
  }, [search, departmentFilter]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-1 py-4 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-black">
              Employees Team
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Overview of corporate human resources, roles and departments
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm focus:outline-none"
          >
            <Plus size={16} />
            Add Employee
          </button>
        </div>

        {/* Filters Controls Area */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full">
          {/* Search Input Box */}
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search employee by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Department Filter Select Dropdown */}
          <div className="relative w-full sm:w-56">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="All">All Departments</option>
              <option value="IT">IT Department</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Marketing">Marketing</option>
              <option value="Management">Management</option>
              <option value="HR">Human Resources</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Redux-Connected Employee Data Table Component */}
        <EmployeeTable employees={currentEmployees} user={user} />

        {/* Premium Pagination Controls Wrapper */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-xs font-bold px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl border border-transparent dark:border-slate-700/60">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Creation Dialog Modal Component */}
        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default EmployeesPage;
