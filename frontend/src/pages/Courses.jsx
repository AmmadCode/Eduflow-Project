import React, { useEffect, useState } from "react";
import { getAllCourses } from "../services/courseServices";
import CourseCard from "../components/CourseCard.jsx";
import { Search } from "lucide-react";

const categories = [
  "All",
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
  "Meta Ads",
  "Virtual Assistant",
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.courses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter((course) => {
    const matchCategory = selected === "All" || course.category === selected;
    const matchSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const sortedCourses = [...filtered].sort((a, b) => {
    if (sortBy === "low") {
      return a.price - b.price;
    }
    if (sortBy === "high") {
      return b.price - a.price;
    }
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-100">
        <div className="container-main py-4!">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 py-8">
            <div>
              <p className="text-xs font-mono tracking-widest text-emerald-600 uppercase mb-2">
                All Courses
              </p>
              <h1 className=" text-4xl font-bold text-gray-900">
                Explore{" "}
                <span className="font-serif text-emerald-500 italic">
                  Courses
                </span>
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Find the perfect course to level up your skills
              </p>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-400 bg-gray-50 focus:bg-white transition w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-gray-200 py-5">
            <div className="flex flex-row gap-3 flex-wrap items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition ${
                    selected === cat
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 bg-gray-50 rounded-xl text-sm outline-none py-2 px-3 focus:border-emerald-400 focus:bg-white transition cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="low"> Price:Low to High</option>
                <option value="high"> Price:High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-10!">
        <p className="text-sm text-gray-400 mb-6">
          Showing{" "}
          <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
          courses
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
