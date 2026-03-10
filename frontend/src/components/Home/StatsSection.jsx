import React from "react";

const StatsSection = () => {
  return (
    <section className="bg-white border-t border-gray-100 py-12">
      <div className="container-main">
        <div className="flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">
              12K<span className="text-emerald-500">+</span>
            </span>
            <span className="text-gray-400 text-sm leading-snug max-w-24">
              Active Students Enrolled
            </span>
          </div>

          <div className="w-px h-12 bg-gray-100 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">
              340<span className="text-emerald-500">+</span>
            </span>
            <span className="text-gray-400 text-sm leading-snug max-w-24">
              Expert Courses Available
            </span>
          </div>

          <div className="w-px h-12 bg-gray-100 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">
              4.9<span className="text-emerald-500">★</span>
            </span>
            <span className="text-gray-400 text-sm leading-snug max-w-24">
              Average Student Rating
            </span>
          </div>

          <div className="w-px h-12 bg-gray-100 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">
              98<span className="text-emerald-500">%</span>
            </span>
            <span className="text-gray-400 text-sm leading-snug max-w-24">
              Student Satisfaction Rate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
