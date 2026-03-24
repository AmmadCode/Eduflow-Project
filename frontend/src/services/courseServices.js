import axiosInstance from "./axios";

export const getAllCourses = async () => {
  const response = await axiosInstance.get("/api/courses");
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axiosInstance.get(`/api/courses/${id}`);
  return response.data;
};

export const enrollCourse = async (id) => {
  const response = await axiosInstance.post("/api/enroll", { courseId: id });
  return response.data;
};

export const checkEnrollment = async (courseId) => {
  const response = await axiosInstance.get(`/api/enroll/check/${courseId}`);
  return response.data;
};

export const getMyCourses = async () => {
  const response = await axiosInstance.get("/api/enroll/my-courses");
  return response.data;
};

// for instructor all courses
export const getInstructorCourses = async () => {
  const response = await axiosInstance.get("/api/courses/my-courses");
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axiosInstance.delete(`/api/courses/${id}`);
  return response.data;
};

export const createCourse = async (formData) => {
  const response = await axiosInstance.post("/api/courses", formData);
  return response.data;
};

export const updateCourse = async (id, formData) => {
  const response = await axiosInstance.put(`/api/courses/${id}`, formData);
  return response.data;
};
