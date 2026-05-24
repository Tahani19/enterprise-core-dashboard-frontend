import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import API from "../../../services/api";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Briefcase,
  Shield,
  Phone,
  Lock,
  Camera,
  Award,
} from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/users/profile");
      setUser(data);
      setPreview(data.image || "");
    } catch (error) {
      console.log(error);
      toast.error("Failed to load user profile");
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await API.put("/users/profile", formData);
      setPreview(data.image);
      toast.success("Profile image updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload profile image");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      return toast.error("Please fill in all password fields");
    }

    try {
      await API.put("/users/change-password", passwordData);
      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password. Check your current password.");
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Loading Profile...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-1 py-4 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* Profile Hero Header Box */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 shadow-md text-white mb-8 overflow-hidden relative border border-slate-800/50">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
            {/* User Avatar with Hover Edit Overlay */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-indigo-500/30 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src={preview || "https://i.pravatar.cc/300"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute inset-0 bg-slate-950/60 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200 text-white gap-1 text-xs font-semibold">
                <Camera size={20} className="text-indigo-400 animate-pulse" />
                <span>Change Image</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Profile Meta Details */}
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold tracking-wide bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                <Shield size={12} />
                {user.role || "Employee"}
              </span>
              <h1 className="text-3xl font-black tracking-tight text-white mb-1">
                {user.name}
              </h1>
              <p className="text-slate-400 text-sm font-medium mb-4">
                {user.email}
              </p>

              {/* Status Tags */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-medium text-slate-300">
                <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                  {user.department || "General HQ"}
                </span>
                <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active Status
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout Split Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Panel: Employee Information Fields */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <User size={18} className="text-indigo-500" />
                Personal Profile
              </h2>

              <div className="space-y-4">
                {/* Field Block */}
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                    Full Name
                  </label>
                  <div className="mt-1 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 p-3 rounded-xl font-medium text-sm text-slate-800 dark:text-slate-200">
                    {user.name}
                  </div>
                </div>

                {/* Field Block */}
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                    Email Workspace
                  </label>
                  <div className="mt-1 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 p-3 rounded-xl font-medium text-sm text-slate-800 dark:text-slate-200 break-all flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" />
                    {user.email}
                  </div>
                </div>

                {/* Field Block */}
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                    Assigned Department
                  </label>
                  <div className="mt-1 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 p-3 rounded-xl font-medium text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Briefcase size={14} className="text-slate-400" />
                    {user.department || "N/A"}
                  </div>
                </div>

                {/* Field Block */}
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                    Contact Number
                  </label>
                  <div className="mt-1 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 p-3 rounded-xl font-medium text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" />
                    {user.phone || "Not Configured"}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metric Score Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Award size={18} className="text-indigo-500" />
                Performance KPI
              </h2>

              <div className="space-y-4">
                {/* Productivity bar */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
                    <span className="text-slate-600 dark:text-slate-300">
                      Productivity Rate
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400">
                      92%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-indigo-600 rounded-full" />
                  </div>
                </div>

                {/* Attendance bar */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
                    <span className="text-slate-600 dark:text-slate-300">
                      Attendance Accuracy
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      98%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Change Password Control Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock size={20} className="text-indigo-500" />
                  Security Configuration
                </h2>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                  Update your authentication password credentials regularly to
                  protect your ERP account integrity
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                {/* Current Password Field */}
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider block mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                    placeholder="Enter current active password"
                  />
                </div>

                {/* New Password Field */}
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider block mb-1.5">
                    New Security Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                    placeholder="Create a strong new password"
                  />
                </div>

                {/* Action Submit Control Button */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/50 mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm focus:outline-none"
                  >
                    Update Account Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
