import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, updateCourse } from "../../services/courseServices";
import { toast } from "react-toastify";

const categories = [
  "Web Dev",
  "Backend",
  "Full Stack",
  "Programming",
  "Design",
  "UI/UX",
  "Marketing",
  "Writing",
  "Productivity",
];

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        const course = data.course;
        setFormData({
          title: course.title,
          description: course.description,
          category: course.category,
          price: course.price,
        });
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/instructor/dashboard");
      } finally {
        setFetching(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateCourse(id, formData);
      toast.success("Course updated successfully!");
      navigate("/instructor/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
        <p className="text-sm text-gray-400 mt-1">Update your course details</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-7 max-w-2xl">
        <div className="mb-5">
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition resize-none"
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Course"}
          </button>
          <button
            onClick={() => navigate("/instructor/dashboard")}
            className="px-5 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl text-sm hover:border-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
