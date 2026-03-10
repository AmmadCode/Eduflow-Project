import axiosInstance from "./axios";

export const getAllCourses = async () => {
  const response = await axiosInstance.get("/courses");
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axiosInstance.get(`/courses/${id}`);
  return response.data;
};

export const enrollCourse = async (id) => {
  const response = await axiosInstance.post("/enroll", { courseId: id });
  return response.data;
};

export const checkEnrollment = async (courseId) => {
  const response = await axiosInstance.get(`/enroll/check/${courseId}`);
  return response.data;
};

export const getMyCourses = async () => {
  const response = await axiosInstance.get("/enroll/my-courses");
  return response.data;
};

// for instructor all courses
export const getInstructorCourses = async () => {
  const response = await axiosInstance.get("/courses/my-courses");
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axiosInstance.delete(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (formData) => {
  const response = await axiosInstance.post("/courses", formData);
  return response.data;
};

export const updateCourse = async (id, formData) => {
  const response = await axiosInstance.put(`/courses/${id}`, formData);
  return response.data;
};
