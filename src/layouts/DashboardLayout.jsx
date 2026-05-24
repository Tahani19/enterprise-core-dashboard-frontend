import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc]">

      {/* Sidebar */}
      <div className="w-[260px] flex-shrink-0">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-6 md:p-8 lg:p-10">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;