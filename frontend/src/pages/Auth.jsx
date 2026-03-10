import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await login(formData.email, formData.password);
    } else {
      await register(formData.name, formData.email, formData.password, role);
    }

    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
    setRole("student");
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-16 py-20 overflow-hidden bg-gray-900 relative">
        <Link
          to="/"
          className="font-serif text-2xl font-bold text-white mb-auto"
        >
          Edu<span className="text-emerald-400 italic">Flow</span>
        </Link>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-emerald-500 rounded-full opacity-5 blur-2xl"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500 bg-opacity-10 border border-emerald-500 border-opacity-20 rounded-full px-4 py-2 mb-8">
            <span className="text-white text-xs font-bold">
              ✦ Join 12,000+ learners
            </span>
          </div>
          <h2 className="font-serif text-4xl font-bold text-white leading-tight mb-4">
            Start your Learning
            <span className="text-emerald-400 italic"> Journey today.</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm">
            Get access to 340+ expert courses, earn verified certificates, and
            build skills that get you hired.
          </p>
          <div className="flex flex-col gap-4 mb-10">
            {[
              {
                icon: "🎓",
                title: "Expert Instructors",
                desc: "vetted professionals",
              },
              {
                icon: "📜",
                title: "Verified Certificates",
                desc: "share on LinkedIn",
              },
              {
                icon: "⚡",
                title: "Lifetime Access",
                desc: "learn at your pace",
              },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 bg-opacity-10 flex items-center justify-center text-base shrink-0">
                  {f.icon}
                </div>
                <span className="text-sm text-gray-400">
                  <span className="text-white font-semibold">{f.title}</span> —{" "}
                  {f.desc}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-8 pt-8 border-t border-white border-opacity-5">
            {[
              { num: "12K+", label: "Students" },
              { num: "340+", label: "Courses" },
              { num: "4.9★", label: "Rating" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl text-emerald-400">{s.num}</div>
                <div className="text-xs text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white p-10 relative">
        <Link
          to="/"
          className="absolute right-8 top-5 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition"
        >
          <ArrowLeft size={24} />
        </Link>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome back" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            {isLogin
              ? "Login to continue learning."
              : "Join EduFlow and start your journey."}
          </p>
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setFormData({ name: "", email: "", password: "" });
                setShowPassword(false);
                setRole("student");
              }}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                isLogin ? "bg-white shadow" : "text-gray-500"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setFormData({ name: "", email: "", password: "" });
                setShowPassword(false);
                setRole("student");
              }}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                !isLogin ? "bg-white shadow" : "text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </div>
          {!isLogin && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Join as</p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`border rounded-lg p-3 text-sm ${
                    role === "student"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200"
                  }`}
                >
                  🎓 Student
                </button>

                <button
                  type="button"
                  onClick={() => setRole("instructor")}
                  className={`border rounded-lg p-3 text-sm ${
                    role === "instructor"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200"
                  }`}
                >
                  👨‍🏫 Instructor
                </button>
              </div>
            </div>
          )}
          {!isLogin && (
            <div className="mb-4">
              <label className="text-sm text-gray-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="text-sm text-gray-700 block mb-1">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-700 block mb-1">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-emerald-500"
                placeholder="••••••••"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {isLogin && (
            <div className="text-right mb-6">
              <div className="text-sm text-emerald-600 hover:underline">
                Forgot password?
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={
              !formData.email ||
              !formData.password ||
              (!isLogin && !formData.name)
            }
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
          <div className="text-center mt-6 text-sm text-gray-500">
            {isLogin ? (
              <>
                Don't have an account?
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setFormData({ name: "", email: "", password: "" });
                    setShowPassword(false);
                  }}
                  className="ml-1 text-emerald-600 font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setFormData({ name: "", email: "", password: "" });
                    setShowPassword(false);
                  }}
                  className=" ml-1 text-emerald-600 font-medium hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
