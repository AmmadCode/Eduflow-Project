import axiosInstance from "./axios";

export const gatAnalytics = async () => {
  const response = await axiosInstance.get("/admin/analytics");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/admin");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/admin/${id}`);
  return response.data;
};
