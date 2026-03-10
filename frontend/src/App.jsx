// App.jsx
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";
import ProfileSettings from "./components/shared/ProfileSettings.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import InstructorLayout from "./layouts/InstructorLayout.jsx";
import CreateCourse from "./pages/instructor/CreateCourse.jsx";

import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import InstructorDashboard from "./pages/instructor/InstructorDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import EditCourse from "./pages/instructor/EditCourse.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminCourses from "./pages/admin/AdminCourses.jsx";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Route>
      {/* Auth Route */}
      <Route path="/auth" element={<Auth />} />

      {/* ── STUDENT ROUTES ── */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>

      {/* ── INSTRUCTOR ROUTES ── */}
      <Route
        path="/instructor"
        element={
          <ProtectedRoute allowedRoles={["instructor"]}>
            <InstructorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<InstructorDashboard />} />
        <Route path="create" element={<CreateCourse />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="edit/:id" element={<EditCourse />} />
      </Route>

      {/* ── ADMIN ROUTES ── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
};

export default App;
