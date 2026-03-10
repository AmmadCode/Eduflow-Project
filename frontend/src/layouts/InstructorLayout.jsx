import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  PlusCircle,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const InstructorLayout = () => {
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
      <aside
        className={`w-64 min-h-screen flex flex-col fixed top-0 left-0 bg-gray-900 z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Link to={"/"} className="px-6 py-7 border-b border-white/5">
          <span className="font-serif text-xl font-bold text-white">
            Edu <em className="italic text-emerald-400">Flow</em>
          </span>
        </Link>

        <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3 ">
          <div className="text-white font-bold w-10 h-10 bg-linear-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shrink-0">
            {" "}
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-white">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wide">
              {user.role}
            </p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest px-3 mb-3">
            Menu
          </p>
          <Link
            to="/instructor/dashboard"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition mb-1 ${isActive("/instructor/dashboard") ? "text-emerald-400 bg-emerald-500/10 font-semibold" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link
            to="/instructor/create"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition mb-1 ${isActive("/instructor/create") ? "text-emerald-400 bg-emerald-500/10 font-semibold" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}
          >
            <PlusCircle size={16} /> Create Course
          </Link>

          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest px-3 mb-3 mt-6">
            Account
          </p>

          <Link
            to="/instructor/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition mb-1 ${isActive("/instructor/profile") ? "text-emerald-400 bg-emerald-500/10 font-semibold" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}
          >
            <User size={16} /> Profile
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
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <main className="md:ml-64 flex-1">
        <div className="bg-white border-b border-gray-100 px-4 md:px-8 h-16 flex items-center justify-between sticky top-0 z-50 ">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-500 hover:text-gray-900 transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-base md:text-lg font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-xs text-gray-400 hidden md:block">
                Welcome back, {user.name}!
              </p>
            </div>
          </div>
          <Link
            to="/instructor/create"
            className="px-3 md:px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs md:text-sm font-bold rounded-xl transition "
          >
            Create Course
          </Link>
        </div>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default InstructorLayout;
