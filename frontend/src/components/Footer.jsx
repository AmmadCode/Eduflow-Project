import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 ">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14 md:place-items-center">
          <div>
            <Link
              to="/"
              className="font-serif text-3xl font-bold text-white mb-4"
            >
              Edu<span className="text-emerald-400 italic">Flow</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-6">
              Empowering learners worldwide with quality education and expert
              instructors. Build real skills that matter
            </p>
          </div>
          <div>
            <h6 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Quick Links
            </h6>
            <ul className="flex flex-col gap-3 list-none">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white text-sm transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-white text-sm transition"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white text-sm transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/auth"
                  className="text-gray-400 hover:text-white text-sm transition"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Contact Us
            </h6>
            <div className="flex flex-col gap-3">
              <span className="text-gray-400 text-sm">
                {" "}
                support@eduflow.com
              </span>
              <span className="text-gray-400 text-sm">Lahore, Pakistan</span>
              <span className="text-gray-400 text-sm">
                Mon – Fri, 9am – 6pm
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs font-mono">
            © 2026 EDUFLOW — ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-2">
            <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-900 text-emerald-400">
              MongoDB
            </span>
            <span className="text-xs font-mono px-2 py-1 rounded bg-yellow-900 text-yellow-400">
              Express
            </span>
            <span className="text-xs font-mono px-2 py-1 rounded bg-blue-900 text-blue-400">
              React
            </span>
            <span className="text-xs font-mono px-2 py-1 rounded bg-green-900 text-green-400">
              Node.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
