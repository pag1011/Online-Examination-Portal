import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

// Teacher Pages
import TeacherLogin from "./pages/Teacher/TeacherLogin";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import UploadNotes from "./pages/Teacher/UploadNotes";
import MyNotes from "./pages/Teacher/MyNotes";
import CreateTest from "./pages/Teacher/CreateTest";
import Results from "./pages/Teacher/Results";
import ManageTests from "./pages/Teacher/ManageTests";
import ViewTest from "./pages/Teacher/ViewTest";
import EditTest from "./pages/Teacher/EditTest";
import Analytics from "./pages/Teacher/Analytics";

// Student Pages
import StudentLogin from "./pages/Student/StudentLogin";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AvailableTests from "./pages/Student/AvailableTests";
import StudentNotes from "./pages/Student/StudentNotes";
import Test from "./pages/Student/Test";
import MyResults from "./pages/Student/MyResults";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/teacher-login" element={<TeacherLogin />} />

        <Route path="/student-login" element={<StudentLogin />} />

        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute userType="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-notes"
          element={
            <ProtectedRoute userType="teacher">
              <UploadNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-notes"
          element={
            <ProtectedRoute userType="teacher">
              <MyNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-test"
          element={
            <ProtectedRoute userType="teacher">
              <CreateTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute userType="teacher">
              <Results />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-tests"
          element={
            <ProtectedRoute userType="teacher">
              <ManageTests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-test/:id"
          element={
            <ProtectedRoute userType="teacher">
              <ViewTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-test/:id"
          element={
            <ProtectedRoute userType="teacher">
              <EditTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute userType="teacher">
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute userType="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/available-tests"
          element={
            <ProtectedRoute userType="student">
              <AvailableTests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-notes"
          element={
            <ProtectedRoute userType="student">
              <StudentNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-results"
          element={
            <ProtectedRoute userType="student">
              <MyResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test/:id"
          element={
            <ProtectedRoute userType="student">
              <Test />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
