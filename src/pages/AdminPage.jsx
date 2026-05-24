import DashboardLayout
from "../layouts/DashboardLayout";

const AdminPage = () => {

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Admin Panel
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
          Manage Users
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
          Manage Roles
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
          System Logs
        </div>

      </div>

    </DashboardLayout>
  );
};

export default AdminPage;