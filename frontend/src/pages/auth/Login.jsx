import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const normalizedEmail = email.trim().toLowerCase();
    await login(normalizedEmail, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
      <p className="text-gray-500 text-sm mb-8">Login to continue learning.</p>

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm text-gray-700 block mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="text-sm text-gray-700 block mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-emerald-500"
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

      {/* Forgot Password */}
      <div className="text-right mb-6">
        <Link
          to="/auth/forgot-password"
          className="text-sm text-emerald-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!email || !password || loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
      >
        {loading ? "Please wait..." : "Login"}
      </button>

      {/* Switch to Register */}
      <p className="text-center mt-6 text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-emerald-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default Login;
