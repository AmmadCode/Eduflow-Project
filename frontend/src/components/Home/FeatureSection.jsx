import React from "react";
import Title from "../Title";

const FeatureSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container-main">
        {/* Section Heading */}
        <Title
          text1={"Why EduFlow"}
          text2={"Everything you need to"}
          text3={"grow your skills"}
          text4={
            " Built for learners who want practical, job-ready skills from real industry experts. No fluff, just results."
          }
        />

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="card group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl mb-5 group-hover:bg-emerald-100 transition">
              🎓
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Expert Instructors
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every instructor is hand-picked — real professionals with 5+ years
              of hands-on experience at top companies worldwide.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mb-5 group-hover:bg-blue-100 transition">
              📜
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Verified Certificates
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Earn industry-recognized certificates on completion. Share
              directly to LinkedIn and get noticed by recruiters instantly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card group">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl mb-5 group-hover:bg-amber-100 transition">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Learn at Your Pace
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Lifetime access to every course you enroll in. Pause, rewind, and
              revisit anytime — your learning never expires.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
