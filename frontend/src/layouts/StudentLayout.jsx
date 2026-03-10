import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  Search,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside
        className={`w-64 bg-gray-900 min-h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-6 py-7 border-b border-white/5">
          <span className="font-serif text-xl font-bold text-white">
            Edu<em className="italic text-emerald-400">Flow</em>
          </span>
        </div>

        <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 text-white font-bold flex items-center justify-center shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wide">
              Student
            </p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest px-3 mb-3">
            Menu
          </p>
          <Link
            to="/student/dashboard"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition mb-1 ${isActive("/student/dashboard") ? "text-emerald-400 bg-emerald-500/10 font-semibold" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link
            to="/courses"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/5 transition mb-1"
          >
            <Search size={16} /> Browse Courses
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/5 transition mb-1"
          >
            <BookOpen size={16} /> My Courses
          </Link>

          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest px-3 mb-3 mt-6">
            Account
          </p>
          <Link
            to="/student/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition mb-1 ${isActive("/student/profile") ? "text-emerald-400 bg-emerald-500/10 font-semibold" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}
          >
            <User size={16} /> Profile
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/5 transition mb-1"
          >
            <Settings size={16} /> Settings
          </Link>
        </nav>

        <div className="px-3 py-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition w-full"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <main className="md:ml-64 flex-1">
        <div className="bg-white border-b border-gray-100 px-4 md:px-8 h-16 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-500 hover:text-gray-900 transition"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-base md:text-lg font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-xs text-gray-400 hidden md:block">
                Welcome back, {user?.name}!
              </p>
            </div>
          </div>
          <Link
            to="/courses"
            className="px-3 md:px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs md:text-sm font-bold rounded-xl transition"
          >
            Browse Courses
          </Link>
        </div>

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
