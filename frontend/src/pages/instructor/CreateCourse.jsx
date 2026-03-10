import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../services/courseServices";
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
  "Data Science",
  "Machine Learning",
  "Virtual Assistant",
  "Meta Ads",
];

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await createCourse(formData);
      toast.success("Course created successfully!");
      navigate("/instructor/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create Course</h1>
        <p className="text-sm text-gray-400 mt-1">Fill in the details below</p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-7 max-w-2xl">
        {/* Title */}
        <div className="mb-5">
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Complete React Bootcamp"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What will students learn?"
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition resize-none"
          />
        </div>

        {/* Category */}
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

        {/* Price */}
        <div className="mb-8">
          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0 for free"
            min="0"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSumbit}
          disabled={loading}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </div>
    </>
  );
};

export default CreateCourse;
