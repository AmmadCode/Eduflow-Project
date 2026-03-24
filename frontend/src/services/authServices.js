import axiosInstance from "./axios";

export const registerUser = async (data) => {
  const response = await axiosInstance.post("/api/auth/register", data);
  return response.data;
};

export const verifyOtp = async (userId, otp) => {
  const response = await axiosInstance.post("/api/auth/verify-otp", {
    userId,
    otp,
  });
  return response.data;
};

export const resendOtp = async (userId) => {
  const response = await axiosInstance.post("/api/auth/resend-otp", { userId });
  return response.data;
};

export const forgotPasswordApi = async (email) => {
  const response = await axiosInstance.post("/api/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPasswordApi = async (email, otp, newPassword) => {
  const response = await axiosInstance.post("/api/auth/reset-password", {
    email,
    otp,
    newPassword,
  });
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/api/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/api/auth/logout");
  return response.data;
};

export const getMeUser = async () => {
  const response = await axiosInstance.get("/api/auth/me");
  return response.data;
};
