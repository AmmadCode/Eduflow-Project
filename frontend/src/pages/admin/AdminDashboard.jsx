import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { gatAnalytics } from "../../services/adminServices";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await gatAnalytics();
        setAnalytics(data.analytics);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* WELCOME BANNER */}
      <div className="bg-gray-900 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-32 w-48 h-48 bg-red-500 opacity-5 rounded-full translate-y-1/2" />
        <p className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">
          Admin Dashboard
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
          Platform Overview,{" "}
          <em className="italic text-red-400">{user?.name}!</em>
        </h2>
        <div className="flex gap-8 flex-wrap">
          <div>
            <p className="font-serif text-3xl font-bold text-white">
              {analytics?.totalUsers || 0}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total Users</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-bold text-white">
              {analytics?.totalCourses || 0}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total Courses</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-bold text-white">
              {analytics?.totalEnrollments || 0}
            </p>
            <p className="text-xs text-gray-500 mt-1">Enrollments</p>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Users",
            value: analytics?.totalUsers || 0,
            bg: "bg-emerald-50",
            emoji: "👥",
          },
          {
            label: "Total Courses",
            value: analytics?.totalCourses || 0,
            bg: "bg-blue-50",
            emoji: "📚",
          },
          {
            label: "Enrollments",
            value: analytics?.totalEnrollments || 0,
            bg: "bg-amber-50",
            emoji: "🎓",
          },
          {
            label: "Instructors",
            value: analytics?.totalInstructors || 0,
            bg: "bg-purple-50",
            emoji: "👨‍🏫",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4"
          >
            <div
              className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}
            >
              {stat.emoji}
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-1">Manage Users</h3>
          <p className="text-sm text-gray-400 mb-4">View and delete users</p>
          <Link
            to="/admin/users"
            className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition"
          >
            View Users →
          </Link>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-1">Manage Courses</h3>
          <p className="text-sm text-gray-400 mb-4">View and delete courses</p>
          <Link
            to="/admin/courses"
            className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition"
          >
            View Courses →
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
