import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendTrigger, setResendTrigger] = useState(0);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const { verify, resendOtp } = useAuth();

  // Agar userId nahi → register pe bhejo
  useEffect(() => {
    if (!userId) navigate("/auth/register");
  }, [userId]);

  // Timer
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

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setOtpLoading(true);
      await verify(userId, otp);
    } catch (error) {
      console.log(error);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp(userId);
      setOtp("");
      setResendTrigger((prev) => prev + 1);
      setCanResend(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleVerify} className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Verify Your Email
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        We sent a 6-digit OTP to your email. Check your inbox!
      </p>

      {/* OTP Input */}
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
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-emerald-500 transition"
        />
      </div>

      {/* Timer + Resend */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-400">
          {canResend ? (
            "Didn't receive the code?"
          ) : (
            <>
              Expires in{" "}
              <span className="font-bold text-emerald-600">
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
                ? "text-emerald-600 hover:underline cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }`}
        >
          Resend OTP
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={otp.length !== 6 || otpLoading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
      >
        {otpLoading ? "Verifying..." : "Verify Account"}
      </button>

      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/auth/register")}
        className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition py-2"
      >
        ← Back to Register
      </button>
    </form>
  );
};

export default VerifyOtp;
