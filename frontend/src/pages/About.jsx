import React from "react";

const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-main">
        {/* Heading */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About EduFlow
          </h1>
          <p className="text-gray-600 leading-relaxed">
            EduFlow is a modern learning platform designed to help students and
            professionals build real-world skills. We focus on practical,
            project-based learning combined with expert mentorship and
            structured learning paths.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our mission is to empower learners worldwide by providing
              accessible, high-quality education in technology, business, and
              creative disciplines.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe education should be practical, affordable, and
              career-focused. Every course is designed to help learners move
              from theory to real implementation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
            <ul className="space-y-3 text-gray-600">
              <li>✔ Industry-focused curriculum</li>
              <li>✔ Real-world projects</li>
              <li>✔ Expert instructors</li>
              <li>✔ Lifetime access to materials</li>
              <li>✔ Structured learning paths</li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-emerald-600">15K+</h3>
            <p className="text-gray-600 text-sm">Active Students</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-emerald-600">120+</h3>
            <p className="text-gray-600 text-sm">Courses Available</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-emerald-600">50+</h3>
            <p className="text-gray-600 text-sm">Expert Instructors</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-emerald-600">98%</h3>
            <p className="text-gray-600 text-sm">Student Satisfaction</p>
          </div>
        </div>

        {/* Long Content Section */}
        <div className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold mb-4">
            Our Learning Philosophy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At EduFlow, we believe learning should be engaging, structured, and
            outcome-driven. Our courses combine theory with implementation so
            learners can apply knowledge immediately.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We continuously update our curriculum to match industry standards.
            Whether you're a beginner or an advanced learner, our guided
            pathways help you achieve mastery step by step.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From backend development to frontend frameworks, database design,
            and system architecture — our goal is to prepare students for
            real-world problem solving.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Education is evolving, and EduFlow aims to be at the forefront of
            digital transformation in learning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
