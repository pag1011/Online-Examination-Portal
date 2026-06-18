import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/studentDashboard.css";

// This component serves as the main dashboard for students, providing an overview of available tests, notes, and results.
// It also allows students to navigate to different sections of the portal and log out.
function StudentDashboard() {
  const [openMenu, setOpenMenu] = useState(false);

  const [stats, setStats] = useState({
    tests: 0,
    notes: 0,
    results: 0,
    averageScore: 0,
  });

  const navigate = useNavigate();

  // Retrieve student information from local storage
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

  useEffect(() => {
    const loadStats = async () => {
      try {
        const tests = await axios.get("http://localhost:5000/api/tests");

        const notes = await axios.get("http://localhost:5000/api/notes");

        const results = await axios.get(
          `http://localhost:5000/api/results/student/${studentInfo?.name}`,
        );

        const average = results.data.length
          ? (
              results.data.reduce((sum, result) => sum + result.percentage, 0) /
              results.data.length
            ).toFixed(2)
          : 0;

        setStats({
          tests: tests.data.length,
          notes: notes.data.length,
          results: results.data.length,
          averageScore: average,
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadStats();
  }, [studentInfo]);

  // Function to handle student logout
  const logoutHandler = () => {
    localStorage.removeItem("studentInfo");
    navigate("/");
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="topbar">
          <button className="menu-btn" onClick={() => setOpenMenu(true)}>
            ☰
          </button>

          <h2>Student Portal</h2>
        </div>

        {openMenu && (
          <div className="sidebar">
            <button className="close-btn" onClick={() => setOpenMenu(false)}>
              ✖
            </button>

            <div className="profile-box">
              <h3>{studentInfo?.name}</h3>

              <p>{studentInfo?.email}</p>
            </div>

            <Link to="/available-tests">Available Tests</Link>

            <Link to="/my-results">My Results</Link>

            <Link to="/student-notes">Notes</Link>

            <button className="logout-btn" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        )}

        <div className="main-content">
          <h1>Hello, {studentInfo?.name} 👋</h1>

          <div className="stats-cards">
            <div className="stat-card tests-stat">
              <h3>📝 Tests</h3>
              <h1>{stats.tests}</h1>
            </div>

            <div className="stat-card notes-stat">
              <h3>📚 Notes</h3>
              <h1>{stats.notes}</h1>
            </div>

            <div className="stat-card results-stat">
              <h3>📊 Results</h3>
              <h1>{stats.results}</h1>
            </div>

            <div className="stat-card score-stat">
              <h3>🏆 Average</h3>
              <h1>{stats.averageScore}%</h1>
            </div>
          </div>

          <div className="dashboard-cards">
            <Link to="/available-tests" className="card-link">
              <div className="card">
                <h3>📝 Available Tests</h3>

                <p>Attempt online tests.</p>
              </div>
            </Link>

            <Link to="/my-results" className="card-link">
              <div className="card">
                <h3>📊 My Results</h3>

                <p>Check your scores.</p>
              </div>
            </Link>

            <Link to="/student-notes" className="card-link">
              <div className="card">
                <h3>📚 Study Notes</h3>

                <p>Access uploaded notes.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default StudentDashboard;
