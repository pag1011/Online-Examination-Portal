import { Link, useNavigate } from "react-router-dom";

// Sidebar component for teacher's dashboard with navigation links and logout functionality
function Sidebar({ closeMenu }) {
  const navigate = useNavigate();

  const teacherInfo = JSON.parse(localStorage.getItem("teacherInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("teacherInfo");

    navigate("/");
  };

  return (
    <div className="teacher-sidebar">
      <button className="close-btn" onClick={closeMenu}>
        ✖
      </button>

      <div className="profile-box">
        <h3>{teacherInfo?.name}</h3>

        <p>{teacherInfo?.email}</p>
      </div>

      <Link to="/teacher-dashboard">Dashboard</Link>

      <Link to="/upload-notes">Upload Notes</Link>

      <Link to="/my-notes">My Notes</Link>

      <Link to="/create-test">Create Test</Link>

      <Link to="/results">Results</Link>

      <Link to="/manage-tests">Manage Tests</Link>

      <Link to="/analytics">Analytics</Link>

      <button className="logout-btn" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
