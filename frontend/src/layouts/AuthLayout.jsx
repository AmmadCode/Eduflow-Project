import { Outlet, Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  OTP: "/auth/verify-otp",
  FORGOT: "/auth/forgot-password",
  RESET: "/auth/reset-password",
};

const leftContent = {
  [AUTH_ROUTES.LOGIN]: {
    title: "Start your Learning",
    em: "Journey today.",
    desc: "Get access to 340+ expert courses, earn verified certificates.",
  },
  [AUTH_ROUTES.REGISTER]: {
    title: "Join",
    em: "EduFlow today.",
    desc: "Create your account and start learning from experts.",
  },
  [AUTH_ROUTES.OTP]: {
    title: "One step",
    em: "away.",
    desc: "Enter the verification code sent to your email.",
  },
  [AUTH_ROUTES.FORGOT]: {
    title: "Forgot your",
    em: "password?",
    desc: "No worries! Enter your email and we'll send you a reset OTP.",
  },
  [AUTH_ROUTES.RESET]: {
    title: "Almost",
    em: "there!",
    desc: "Enter the OTP and set your new password.",
  },
};

const AuthLayout = () => {
  const location = useLocation();

  const path = location.pathname.split("?")[0].replace(/\/$/, "");

  const content = leftContent[path] || {
    title: "Welcome",
    em: "Back",
    desc: "Continue your journey.",
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center px-16 py-20 overflow-hidden bg-gray-900 relative">
        <Link
          to="/"
          className="font-serif text-2xl font-bold text-white mb-auto"
        >
          Edu<span className="text-emerald-400 italic">Flow</span>
        </Link>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-emerald-500 rounded-full opacity-5 blur-2xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500 bg-opacity-10 border border-emerald-500 border-opacity-20 rounded-full px-4 py-2 mb-8">
            <span className="text-white text-xs font-bold">
              ✦ Join 12,000+ learners
            </span>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="font-serif text-4xl font-bold text-white leading-tight mb-4">
            {content.title}{" "}
            <span className="text-emerald-400 italic">{content.em}</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            {content.desc}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-white p-10 relative">
        <Link
          to="/"
          aria-label="Go back to home"
          className="absolute right-8 top-5 text-gray-400 hover:text-gray-700 transition"
        >
          <ArrowLeft size={24} />
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
