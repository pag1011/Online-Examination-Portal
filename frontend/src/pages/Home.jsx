import "../styles/home.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

// Home component serves as the landing page for the Online Examination Portal,
// providing an overview of its features and navigation options for teachers and students
function Home() {
  return (
    <>
      <div className="hero-content">
        <h1>🎓 Online Examination Portal</h1>

        <p className="tagline">Smart Assessment Platform</p>

        <div className="features">
          <div className="feature-card">📝 Online Tests</div>

          <div className="feature-card">📚 Study Notes</div>

          <div className="feature-card">🤖 AI Evaluation</div>

          <div className="feature-card">📊 Analytics</div>
        </div>

        <div className="home-buttons">
          <Link to="/teacher-login">
            <button>👨‍🏫 Teacher Login</button>
          </Link>

          <Link to="/student-login">
            <button>👨‍🎓 Student Login</button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
