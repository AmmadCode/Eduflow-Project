import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendTrigger, setResendTrigger] = useState(0);

  const { resetPassword, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) navigate("/auth/forgot-password");
  }, [email]);

  useEffect(() => {
    setTimer(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTrigger]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6 || !newPassword) return;
    try {
      setLoading(true);
      const data = await resetPassword(email, otp, newPassword);
      if (data?.success) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const data = await forgotPassword(email);
      if (data?.success) {
        setOtp("");
        setResendTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">New Password</h2>
      <p className="text-gray-500 text-sm mb-8">
        OTP sent to <span className="font-semibold text-gray-700">{email}</span>
      </p>
      {/* OTP */}
      <div className="mb-4">
        <label
          htmlFor="otp"
          className="text-sm font-medium text-gray-700 block mb-2"
        >
          Enter OTP
        </label>
        <input
          id="otp"
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="_ _ _ _ _ _"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-red-400 transition"
        />
      </div>
      {/* New Password */}
      <div className="mb-6">
        <label
          htmlFor="newPassword"
          className="text-sm font-medium text-gray-700 block mb-2"
        >
          New Password
        </label>
        <div className="relative">
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-red-400 transition"
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
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-400">
          {canResend ? (
            "Didn't receive the code?"
          ) : (
            <>
              Expires in{" "}
              <span className="font-bold text-red-500">
                0:{timer.toString().padStart(2, "0")}
              </span>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className={`text-sm font-semibold transition
      ${
        canResend
          ? "text-red-500 hover:underline cursor-pointer"
          : "text-gray-300 cursor-not-allowed"
      }`}
        >
          Resend OTP
        </button>
      </div>

      <button
        type="submit"
        disabled={otp.length !== 6 || !newPassword || loading}
        className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
      >
        {loading ? "Resetting..." : "Reset Password →"}
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

export default ResetPassword;
