import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMeUser,
  loginUser,
  logoutUser,
  registerUser,
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
          setUser(null); // guest user — bilkul normal
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
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // register

  const register = async (name, email, password, role) => {
    try {
      setLoading(true);

      const data = await registerUser({ name, email, password, role });
      setUser(data.user);
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");

      if (redirect) navigate(redirect);
      else if (data.user.role === "instructor") {
        navigate("/instructor/dashboard");
      } else {
        navigate("/student/dashboard"); // default student
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // logout
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
