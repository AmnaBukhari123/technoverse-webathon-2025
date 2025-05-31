import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [role, setRole] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const { token } = response.data;

      // Save token to localStorage (or sessionStorage)
      localStorage.setItem("token", token);

      // Check role and redirect accordingly
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "department") {
        navigate("/department");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <img src="/assets/login.jpg" alt="Visual" className="left-image" />
        </div>
        <div className="login-right">
          <div className="login-box">
            <h2>Log In</h2>

            <label>Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
            >
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
              <option value="department">Department Official</option>
            </select>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Your Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="form-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="login-button">Log in</button>
            </form>

            <div className="separator">or</div>

            <button className="google-button">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
              />
              Log in with Google
            </button>

            <div className="signup-link">
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
