import React from "react";
import manImage from "../../assets/man.png";

const HeroSection = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
          {/* LEFT — Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-emerald-600 font-semibold">
                Trusted by 12,000+ learners worldwide
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              The smarter way to
              <span className="text-emerald-500 italic"> build skills </span>
              that get you hired.
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              EduFlow gives you access to industry-expert instructors, hands-on
              projects, and verified certificates — everything you need to land
              your next opportunity.
            </p>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <button className="btn-emerald text-sm">Browse Courses →</button>
              <button className="btn-outline text-sm">How it Works</button>
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>No credit
                card
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>Lifetime
                access
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>Free
                certificate
              </span>
            </div>
          </div>

          {/* RIGHT — Man Image with emerald background */}
          <div className="hidden md:flex justify-center items-end relative">
            {/* Emerald blob behind man */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full opacity-15 blur-3xl"></div>
            <div className="absolute bottom-0 left-8 w-72 h-72 bg-emerald-300 rounded-full opacity-10 blur-2xl"></div>

            {/* Green arc background */}
            <div className="absolute bottom-0 right-4 w-80 h-80 bg-linear-to-t from-emerald-100 to-transparent rounded-full"></div>

            {/* Man image on top */}
            <img
              src={manImage}
              alt="EduFlow Instructor"
              className="relative z-10 w-full max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
