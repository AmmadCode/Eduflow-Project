import axiosInstance from "./axios";

export const updateProfile = async (name) => {
  const response = await axiosInstance.put("/user/profile", { name });
  return response.data;
};

export const changePassword = async (oldPassword, newPassword) => {
  const response = await axiosInstance.put("/user/change-password", {
    oldPassword,
    newPassword,
  });
  return response.data;
};
