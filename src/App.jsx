
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";

import StudentLogin from "./pages/StudentLogin.jsx";
import StudentRegistration from "./pages/StudentRegistration.jsx";

import StudentDashboard from "./pages/StudentDashboard.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import ComplaintsPage from "./pages/ComplaintsPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

function RequireAuth({ children }) {
  const location = useLocation();
  let isAuthenticated = false;

  try {
    const session = JSON.parse(
      sessionStorage.getItem("messmate_demo_session") || "null"
    );
    isAuthenticated = session?.loggedIn === true;
  } catch {
    isAuthenticated = false;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default function App() {
  return (
    <Routes>
      {/* First page when opening MessMate */}
      <Route path="/" element={<Navigate to="/register" replace />} />

      {/* Authentication pages */}
      <Route path="/register" element={<StudentRegistration />} />
      <Route path="/login" element={<StudentLogin />} />

      {/* Main application */}
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
