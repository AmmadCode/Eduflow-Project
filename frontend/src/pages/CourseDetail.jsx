import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  checkEnrollment,
  enrollCourse,
  getCourseById,
} from "../services/courseServices";
import courseImages from "../assets/utils/courseImages.js";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const fallback =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&fm=webp";

const learnItems = [
  "Build real world projects",
  "Industry best practices",
  "Hands on experience",
  "Modern tools & techniques",
  "Problem solving skills",
  "Deploy to production",
];

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data.course);
        if (user) {
          const enrollData = await checkEnrollment(id);
          setEnrolled(enrollData.enrolled);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, user]);

  const enrollment = async () => {
    try {
      setEnrollLoading(true);
      const data = await enrollCourse(id);
      setEnrolled(true);
      toast.success("Enrolled successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrollLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="font-bold text-gray-900 text-xl mb-2">
          Course not found
        </h2>
        <Link to="/courses" className="btn-emerald text-sm mt-4">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-64 w-64 h-64 bg-emerald-500 opacity-5 rounded-full translate-y-1/2" />

        <div className="container-main py-12! relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-2 py-8">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-5">
                <Link
                  to="/courses"
                  className="hover:text-emerald-400 transition"
                >
                  Courses
                </Link>
                <span className="text-gray-600">→</span>
                <span className="text-emerald-400">{course.category}</span>
              </div>

              <span className="inline-flex items-center px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full mb-5 tracking-wide uppercase">
                {course.category}
              </span>

              <h1 className="font-serif text-4xl font-bold text-white leading-tight mb-5 tracking-tight">
                {course.title}
              </h1>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg">
                {course.description}
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-sm tracking-wider">
                    ★★★★★
                  </span>
                  <span className="text-amber-400 font-bold text-sm">4.9</span>
                  <span className="text-gray-500 text-sm">rating</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                    {course.instructor?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {course.instructor?.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative z-10 mt-6">
              <div className="h-48 overflow-hidden">
                <img
                  src={courseImages[course.category] || fallback}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-5">
                  {course.price === 0 ? (
                    <span className="text-emerald-500 font-bold text-2xl">
                      Free
                    </span>
                  ) : (
                    <span className=" text-4xl font-bold text-gray-900">
                      ${course.price}
                    </span>
                  )}
                </div>

                {!user ? (
                  <Link
                    to={`/auth/login?redirect=/courses/${id}`}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm transition mb-5 text-center block"
                  >
                    Login to Enroll
                  </Link>
                ) : user.role !== "student" ? (
                  <div className="w-full bg-gray-50 border border-gray-200 text-gray-400 font-bold py-3.5 rounded-xl text-sm text-center mb-5">
                    Not available for {user.role}
                  </div>
                ) : (
                  <button
                    onClick={enrollment}
                    disabled={enrolled || enrollLoading}
                    className={`w-full font-bold py-3.5 rounded-xl text-sm transition mb-5 ${
                      enrolled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white"
                    }`}
                  >
                    {enrollLoading
                      ? "Enrolling..."
                      : enrolled
                        ? "Enrolled ✓"
                        : "Enroll Now"}
                  </button>
                )}
                {enrolled && (
                  <Link
                    to="/student/dashboard"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-sm transition text-center block mb-3"
                  >
                    Go to Dashboard →
                  </Link>
                )}

                <div className="h-px bg-gray-100 mb-4" />

                <ul className="space-y-3">
                  {[
                    ["Full lifetime access", "bg-blue-50 text-blue-500"],
                    ["Access on all devices", "bg-purple-50 text-purple-500"],
                    ["Certificate of completion", "bg-amber-50 text-amber-500"],
                    ["Free lifetime updates", "bg-emerald-50 text-emerald-500"],
                  ].map(([text, color], i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-xs text-gray-500"
                    >
                      <span
                        className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center font-bold text-xs`}
                      >
                        {i === 0 ? "A" : i === 1 ? "D" : i === 2 ? "C" : "U"}
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-12!">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-5">
            <div className="bg-white border border-gray-100 rounded-2xl p-7">
              <h2 className="font-bold text-gray-900 text-lg mb-6 pb-4 border-b border-gray-100">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learnItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-7">
              <h2 className="font-bold text-gray-900 text-lg mb-6 pb-4 border-b border-gray-100">
                About This Course
              </h2>
              <p className="text-sm text-gray-500 leading-loose">
                {course.description}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-7">
              <h2 className="font-bold text-gray-900 text-lg mb-6 pb-4 border-b border-gray-100">
                Your Instructor
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-emerald-100 flex-shrink-0">
                  {course.instructor?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base">
                    {course.instructor?.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-mono">
                    {course.instructor?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
