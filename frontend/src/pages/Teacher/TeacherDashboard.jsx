import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import TeacherLayout from "../../layouts/TeacherLayout";
import "../../styles/dashboard.css";
import { API_URL } from "../../config";

// TeacherDashboard component provides an overview of the teacher's activities and statistics
function TeacherDashboard() {
  const [stats, setStats] = useState({
    notes: 0,
    tests: 0,
    students: 0,
    results: 0,
  });

  // Retrieve teacher information from local storage
  const teacherInfo = JSON.parse(localStorage.getItem("teacherInfo"));

  const loadStats = async () => {
    try {
      const notes = await axios.get(`${API_URL}/api/notes`);

      const tests = await axios.get(`${API_URL}/api/tests`);

      const results = await axios.get(`${API_URL}/api/results`);

      const students = await axios.get(`${API_URL}/api/students/count`);

      setStats({
        notes: notes.data.length,

        tests: tests.data.length,

        results: results.data.length,

        students: students.data.count,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Load statistics when the component mounts and set up an interval to refresh them every 10 seconds
  useEffect(() => {
    loadStats();

    const interval = setInterval(loadStats, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TeacherLayout>
      <div className="dashboard-header">
        <h1>Welcome, {teacherInfo?.name} 👋</h1>

        <p>Manage your tests, notes and student performance</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card notes-card">
          <h3>📚 Total Notes</h3>
          <h1>{stats.notes}</h1>
        </div>

        <div className="stat-card tests-card">
          <h3>📝 Total Tests</h3>
          <h1>{stats.tests}</h1>
        </div>

        <div className="stat-card students-card">
          <h3>👨‍🎓 Total Students</h3>
          <h1>{stats.students}</h1>
        </div>

        <div className="stat-card results-card">
          <h3>📊 Total Results</h3>
          <h1>{stats.results}</h1>
        </div>
      </div>

      <div className="dashboard-cards">
        <Link to="/upload-notes" className="card-link">
          <div className="card">
            <h2>📤 Upload Notes</h2>
            <p>Upload study material</p>
          </div>
        </Link>

        <Link to="/my-notes" className="card-link">
          <div className="card">
            <h2>📚 My Notes</h2>
            <p>View uploaded notes</p>
          </div>
        </Link>

        <Link to="/create-test" className="card-link">
          <div className="card">
            <h2>📝 Create Test</h2>
            <p>Create new examination</p>
          </div>
        </Link>

        <Link to="/results" className="card-link">
          <div className="card">
            <h2>📈 Results</h2>
            <p>Check student results</p>
          </div>
        </Link>

        <Link to="/manage-tests" className="card-link">
          <div className="card">
            <h2>⚙ Manage Tests</h2>
            <p>Edit and manage tests</p>
          </div>
        </Link>

        <Link to="/analytics" className="card-link">
          <div className="card">
            <h2>📊 Analytics</h2>
            <p>View statistics</p>
          </div>
        </Link>
      </div>
    </TeacherLayout>
  );
}

export default TeacherDashboard;
