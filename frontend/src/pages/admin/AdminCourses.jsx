import { useEffect, useState } from "react";
import { getAllCourses, deleteCourse } from "../../services/courseServices";
import { toast } from "react-toastify";
import courseImages from "../../assets/utils/courseImages";

const fallback =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&fm=webp";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
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
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteCourse(id);
      setCourses(courses.filter((c) => c._id !== id));
      toast.success("Course deleted!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            All Courses
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {courses.length} total courses
          </p>
        </div>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition w-full md:w-48"
        />
      </div>

      {/* MOBILE — Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((c) => (
          <div
            key={c._id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
          >
            <div className="h-32 overflow-hidden relative">
              <img
                src={courseImages[c.category] || fallback}
                alt={c.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 text-emerald-600 text-xs font-bold rounded-full">
                {c.category}
              </span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{c.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  by {c.instructor?.name} ·{" "}
                  {c.price === 0 ? "Free" : `$${c.price}`}
                </p>
              </div>
              <button
                onClick={() => handleDelete(c._id)}
                className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition flex-shrink-0 ml-3"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP — Table */}
      <div className="hidden md:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Course
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Instructor
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c._id}
                className="border-b border-gray-50 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={courseImages[c.category] || fallback}
                      alt={c.title}
                      className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {c.title}
                      </p>
                      <span className="text-xs text-emerald-600 font-bold">
                        {c.category}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">{c.instructor?.name}</p>
                  <p className="text-xs text-gray-400 font-mono">
                    {c.instructor?.email}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold
                    ${c.price === 0 ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"}`}
                  >
                    {c.price === 0 ? "Free" : `$${c.price}`}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminCourses;
