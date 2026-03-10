import React from "react";
import { Link } from "react-router-dom";
import courseImages from "../assets/utils/courseImages";

const fallback =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&fm=webp";

const EnrollCourseCard = ({ enrollment }) => {
  const course = enrollment.course;
  if (!course) return null;
  return (
    <Link
      to={`/courses/${course._id}`}
      className="block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-emerald-200 hover:shadow-lg transition-all duration-200"
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
        <p className="text-xs text-gray-400 mb-4">
          by {course.instructor?.name}
        </p>

        {/* Progress */}
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Progress</span>
          <span>0%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-0 bg-linear-to-r from-emerald-400 to-teal-500 rounded-full" />
        </div>
      </div>
    </Link>
  );
};

export default EnrollCourseCard;
