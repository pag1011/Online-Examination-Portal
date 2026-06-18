import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

// TeacherLayout component provides a consistent layout for the teacher portal, including a topbar and sidebar
function TeacherLayout({ children }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="teacher-container">
      <div className="teacher-topbar">
        <button className="menu-btn" onClick={() => setOpenMenu(true)}>
          ☰
        </button>

        <h2>Teacher Portal</h2>
      </div>

      {openMenu && <Sidebar closeMenu={() => setOpenMenu(false)} />}

      <div className="teacher-content">{children}</div>
    </div>
  );
}

export default TeacherLayout;
