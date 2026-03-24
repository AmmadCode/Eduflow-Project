import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    const normalizedEmail = formData.email.trim().toLowerCase();

    const userId = await register(
      formData.name.trim(),
      normalizedEmail,
      formData.password,
      role,
    );

    if (userId) {
      navigate(`/auth/verify-otp?userId=${userId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
      <p className="text-gray-500 text-sm mb-8">
        Join EduFlow and start your journey.
      </p>

      {/* Role */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Join as</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["student", "🎓 Student"],
            ["instructor", "👨‍🏫 Instructor"],
          ].map(([r, label]) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`border rounded-lg p-3 text-sm font-medium transition
                ${
                  role === r
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="text-sm text-gray-700 block mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="text-sm text-gray-700 block mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label htmlFor="password" className="text-sm text-gray-700 block mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-emerald-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={
          !formData.name || !formData.email || !formData.password || loading
        }
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Switch to Login */}
      <p className="text-center mt-6 text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-emerald-600 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
