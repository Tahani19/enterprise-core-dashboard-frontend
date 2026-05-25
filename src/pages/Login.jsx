import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldAlert, Eye, EyeOff } from "lucide-react";
import API from "../services/api";
import { setCredentials } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "test3@test.com",
    password: "123456",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { data } = await API.post("/auth/login", formData);
      dispatch(setCredentials(data));
      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message ||
          "Invalid credentials. Please use the verified demo account.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-[440px] bg-white dark:bg-[#161f32] rounded-3xl p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-xl transition-all duration-300">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg mx-auto shadow-md shadow-indigo-500/20 mb-4">
            TA
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
            Secure consolidation gateway and management terminal.
          </p>
        </div>

        {/* بطاقة الوصول السريع */}
        <div className="mb-6 p-4 bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100/70 dark:border-indigo-900/40 rounded-2xl">
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            ⚡ Quick Demo Access
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] font-medium leading-relaxed">
            The terminal is open for review. Click{" "}
            <strong className="text-indigo-600 dark:text-indigo-400">
              Create Session
            </strong>{" "}
            to authorize directly with pre-filled employee credentials.
          </p>
        </div>

        {/* عرض رسائل الخطأ */}
        {errorMessage && (
          <div className="mb-4 p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl text-xs flex items-start gap-2.5">
            <ShieldAlert size={16} className="mt-0.5 flex-shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* حقل البريد الإلكتروني */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
              <Mail size={16} />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Corporate Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl p-3 pl-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* 👁️ حقل كلمة المرور مع زر العين التفاعلي */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
              <Lock size={16} />
            </span>
            <input
              // يتغير النوع ديناميكياً بناءً على الـ State
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Secure Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl p-3 pl-10 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {/* زر العين المطلق في أقصى اليمين */}
            <button
              type="button" // مهم جداً تحديد النوعbutton حتى لا يقوم بعمل submit للفورم عند النقر عليه
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>

          {/* زر التقديم */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm mt-6 group"
          >
            <span>{isLoading ? "Connecting..." : "Create Session"}</span>
            {!isLoading && (
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
