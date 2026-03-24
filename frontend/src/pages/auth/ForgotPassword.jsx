import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;
    try {
      setLoading(true);
      const data = await forgotPassword(normalizedEmail);
      if (data.success) {
        navigate("/auth/reset-password", {
          state: { email: normalizedEmail },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
      <p className="text-gray-500 text-sm mb-8">
        Enter your email and we'll send you an OTP to reset your password.
      </p>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 block mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!email || loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
      >
        {loading ? "Sending..." : "Send OTP →"}
      </button>

      <p className="text-center mt-4 text-sm text-gray-500">
        Remember your password?{" "}
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

export default ForgotPassword;
