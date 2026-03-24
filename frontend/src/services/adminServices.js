import axiosInstance from "./axios";

export const gatAnalytics = async () => {
  const response = await axiosInstance.get("/api/admin/analytics");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/api/admin");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/api/admin/${id}`);
  return response.data;
};
