import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMeUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyOtp,
  resendOtp as resendOtpService,
  forgotPasswordApi,
  resetPasswordApi,
} from "../services/authServices";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await getMeUser();
        setUser(data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null);
        } else {
          setUser(null);
          toast.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // login
  const login = async (email, password) => {
    try {
      setLoading(true);

      const data = await loginUser({ email, password });
      setUser(data.user);
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      if (redirect) navigate(redirect);
      else if (data.user.role === "admin") navigate("/admin/dashboard");
      else if (data.user.role === "instructor")
        navigate("/instructor/dashboard");
      else navigate("/student/dashboard");
    } catch (error) {
      const err = error.response?.data;

      if (err?.userId) {
        toast.error("Please verify your email first");
        navigate(`/auth/verify-otp?userId=${err.userId}`);
        return;
      }

      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // register

  const register = async (name, email, password, role) => {
    try {
      setLoading(true);
      const data = await registerUser({ name, email, password, role });
      toast.success("OTP sent to your email!");
      return data.userId;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (userId) => {
    try {
      const data = await resendOtpService(userId);
      toast.success(data.message || "OTP resent!");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const verify = async (userId, otp) => {
    try {
      setLoading(true);
      const data = await verifyOtp(userId, otp);
      setUser(data.user);

      if (data.user.role === "instructor") navigate("/instructor/dashboard");
      else navigate("/student/dashboard");

      toast.success("Account verified successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);

      const data = await forgotPasswordApi(email);

      if (data.success) {
        toast.success("OTP sent to your email!");
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);

      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      setLoading(true);
      const data = await resetPasswordApi(email, otp, newPassword);
      if (data.success) {
        toast.success("Password reset successfully!");
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Reset failed";

      toast.error(message);

      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // logout
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        setUser,
        verify,
        resendOtp,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
