import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import { API_URL } from "../../config";

// This component handles the student login functionality,
// allowing students to enter their credentials and access their dashboard upon successful authentication.
function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_URL}/api/students/login`, {
        email,
        password,
      });

      localStorage.setItem("studentInfo", JSON.stringify(data));

      navigate("/student-dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Student Login</h1>

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

export default StudentLogin;
