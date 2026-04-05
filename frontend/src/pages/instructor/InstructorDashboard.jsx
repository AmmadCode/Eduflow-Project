import React, { useEffect, useState } from "react";
import {
  deleteCourse,
  getInstructorCourses,
} from "../../services/courseServices";
import { Link } from "react-router-dom";
import courseImages from "../../assets/utils/courseImages";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const fallback =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&fm=webp";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getInstructorCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure")) return;
    try {
      await deleteCourse(id);
      setCourses(courses.filter((c) => c._id !== id));
      toast.success("Course Deleted");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-900 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
          Instructor Dashboard
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
          Welcome, <em className="italic text-emerald-400">{user?.name}!</em>
        </h2>
        <div className="flex gap-8">
          <div>
            <p className="font-serif text-3xl font-bold text-white">
              {courses.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total Courses</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-bold text-white">
              {courses.reduce(
                (acc, course) => acc + (course.enrollmentCount || 0),
                0,
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total Students</p>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className=" mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your created courses
          </p>
        </div>
      </div>

      {/* Courses */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
            >
              <div className="h-36 bg-gray-100" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📚</p>
          <h3 className="font-bold text-gray-900 mb-1">No courses yet</h3>
          <p className="text-sm text-gray-400 mb-4">Create your first course</p>
          <Link
            to="/instructor/create"
            className="inline-block px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition"
          >
            Create Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <div className="h-36 overflow-hidden relative">
                <img
                  src={courseImages[course.category] || fallback}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 text-emerald-600 text-xs font-bold rounded-full">
                  {course.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">
                  {course.title}
                </h3>
                <p className="ml-1 text-xs text-gray-400 mb-4">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                  {" · "}
                  {course.enrollmentCount || 0} students
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/courses/${course._id}`}
                    className="flex-1 text-center px-3 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:border-emerald-400 hover:text-emerald-500 transition"
                  >
                    View
                  </Link>
                  <Link
                    to={`/instructor/edit/${course._id}`}
                    className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-500 text-xs font-bold rounded-xl hover:bg-blue-100 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-500 text-xs font-bold rounded-xl hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default InstructorDashboard;
