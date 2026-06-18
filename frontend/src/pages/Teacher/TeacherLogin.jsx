import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teacherLogin } from "../../api/teacherApi";
import "../../styles/auth.css";

// TeacherLogin component provides a login interface for teachers to access their dashboard
function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await teacherLogin({
        email,
        password,
      });

      localStorage.setItem("teacherInfo", JSON.stringify(data));

      navigate("/teacher-dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Teacher Login</h1>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default TeacherLogin;
