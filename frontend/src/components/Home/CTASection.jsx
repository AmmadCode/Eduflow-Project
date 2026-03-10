import React from "react";

const CTASection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container-main text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 font-mono mb-3 block">
          Join EduFlow Today
        </span>

        <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Your next chapter starts
          <span className="text-emerald-500 italic"> right here.</span>
        </h2>

        <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto mb-10">
          Join 12,000+ students already building real-world skills. Start for
          free — no commitment, no credit card needed.
        </p>

        <div className="flex gap-4 justify-center flex-wrap mb-14">
          <button className="btn-emerald text-sm">Start Learning Free →</button>
          <button className="btn-outline text-sm">Browse Courses</button>
        </div>

        {/* Stats */}
        <div className="flex justify-center items-center gap-12 flex-wrap">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">12K+</div>
            <div className="text-xs text-gray-400 mt-1">Active Students</div>
          </div>
          <div className="w-px h-10 bg-gray-300 hidden md:block"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">340+</div>
            <div className="text-xs text-gray-400 mt-1">Expert Courses</div>
          </div>
          <div className="w-px h-10 bg-gray-300 hidden md:block"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">98%</div>
            <div className="text-xs text-gray-400 mt-1">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
