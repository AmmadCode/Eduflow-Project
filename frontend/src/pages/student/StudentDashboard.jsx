import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMyCourses } from "../../services/courseServices";
import EnrollCourseCard from "../../components/EnrollCourseCard";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getMyCourses();
        setEnrollments(data.enrollments);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      {/* WELCOME BANNER */}
      <div className="bg-gray-900 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-32 w-48 h-48 bg-emerald-500 opacity-5 rounded-full translate-y-1/2" />
        <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
          Student Dashboard
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
          Keep Learning,{" "}
          <em className="italic text-emerald-400">{user?.name}!</em>
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          You are making great progress. Keep it up!
        </p>
        <div className="flex gap-8">
          <div>
            <p className="font-serif text-3xl font-bold text-white">
              {enrollments.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Enrolled Courses</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-bold text-white">0</p>
            <p className="text-xs text-gray-500 mt-1">Completed</p>
          </div>
        </div>
      </div>

      {/* MY COURSES */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900">My Courses</h2>
        <Link
          to="/courses"
          className="text-sm font-semibold text-emerald-500 hover:underline"
        >
          Browse More →
        </Link>
      </div>

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
      ) : enrollments.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📚</p>
          <h3 className="font-bold text-gray-900 mb-1">No courses yet</h3>
          <p className="text-sm text-gray-400 mb-4">
            Enroll in a course to get started
          </p>
          <Link
            to="/courses"
            className="inline-block px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {enrollments.map((enrollment) => (
            <EnrollCourseCard key={enrollment._id} enrollment={enrollment} />
          ))}
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
