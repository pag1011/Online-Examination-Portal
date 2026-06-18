import { Navigate } from "react-router-dom";

// A protected route component that checks user type and redirects if not authenticated
function ProtectedRoute({ children, userType }) {
  if (userType === "teacher") {
    const teacherInfo = localStorage.getItem("teacherInfo");

    return teacherInfo ? children : <Navigate to="/teacher-login" />;
  }

  if (userType === "student") {
    const studentInfo = localStorage.getItem("studentInfo");

    return studentInfo ? children : <Navigate to="/student-login" />;
  }
  return <Navigate to="/" />;
}

export default ProtectedRoute;
