import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
    isActive
      ? "text-emerald-600 bg-emerald-50 font-semibold"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
  }`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout, loading } = useAuth();

  const dashboardLink =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "instructor"
        ? "/instructor/dashboard"
        : "/student/dashboard";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container-main flex items-center justify-between h-16 md:grid md:grid-cols-3">
        {/* LEFT — Logo */}
        <div className="flex items-center">
          <Link to="/" className="font-serif text-3xl font-bold text-gray-900">
            Edu<span className="text-emerald-500 italic">Flow</span>
          </Link>
        </div>

        {/* CENTER — Nav Links */}
        <ul className="hidden md:flex justify-center items-center gap-6 list-none">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={navLinkClass}>
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
        </ul>

        {/* RIGHT — Desktop */}
        <div className="hidden md:flex justify-end items-center gap-3">
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
          ) : user ? (
            <>
              {/* Avatar + Chevron */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 hover:bg-gray-100 rounded-full pr-2 py-1 pl-1 transition"
                >
                  {/* Letter Avatar */}
                  <div className="w-9 h-9 rounded-full bg-emerald-500 text-white font-bold text-sm flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Chevron */}
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1.5 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 capitalize">
                        {user.role}
                      </span>
                    </div>

                    {/* Dashboard */}
                    <Link
                      to={dashboardLink}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition"
                    >
                      <LayoutDashboard size={16} className="text-gray-400" />
                      Dashboard
                    </Link>

                    <div className="h-px bg-gray-100 my-1" />

                    {/* Logout */}
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition w-full"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="btn-outline text-sm py-2 px-5">
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn-emerald text-sm py-2 px-5"
              >
                Get Started →
              </Link>
            </>
          )}
        </div>

        {/* RIGHT — Mobile Hamburger */}
        <div className="flex justify-end md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-3 bg-white">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            Courses
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            About
          </NavLink>

          <div className="h-px bg-gray-100 my-2" />

          {loading ? (
            <div className="h-10 bg-gray-100 rounded-full animate-pulse" />
          ) : user ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 px-1 py-2">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white font-bold text-sm flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                  <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 capitalize">
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Dashboard */}
              <Link
                to={dashboardLink}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 btn-outline text-sm py-3 justify-center"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full text-sm text-red-500 border border-red-200 rounded-full py-3 hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="btn-outline text-sm text-center py-3"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                onClick={() => setMenuOpen(false)}
                className="btn-emerald text-sm text-center py-3"
              >
                Get Started →
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
