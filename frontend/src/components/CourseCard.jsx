import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import courseImages from "../assets/utils/courseImages";
import mern from "../assets/mern.jpg";

const CourseCard = ({ course }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 cursor-pointer">
        <div className="h-44 relative overflow-hidden bg-gray-100">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={courseImages[course.category] || mern}
            alt={course.title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-emerald-700 backdrop-blur-sm">
            {course.category}
          </span>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            by {course.instructor?.name || "Instructor"}
          </p>

          <div className="flex items-center border-t border-gray-50 pt-3">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-xs text-gray-500 ml-1">4.8</span>

            <span className="ml-auto  text-xl font-bold text-gray-900">
              {course.price === 0 ? (
                <span className="text-emerald-500 text-base font-sans font-bold">
                  Free
                </span>
              ) : (
                `$${course.price}`
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
