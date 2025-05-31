import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";

const Signup = () => {
  const [role, setRole] = useState("citizen");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Map role to role_id (dummy logic – adjust to your DB roles!)
  let role_id = 1;
  if (role === "admin") role_id = 2;
  else if (role === "department") role_id = 3;

  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", {
      email,
      password,
      username: name,
      department_id: null, // set to null for non-department roles
      role_id,
    });

    console.log("Signup response:", response.data);

    alert("Signup successful!");
    navigate("/login");
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    alert("Signup failed: " + (err.response?.data?.message || "Unknown error"));
  }
};

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        {/* Left image section */}
        <div className="signup-left">
          <img src="/assets/login.jpg" alt="Signup Visual" className="left-image" />
        </div>

        {/* Right signup form section */}
        <div className="signup-right">
          <div className="signup-box">
            <h2>Sign Up</h2>

            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
            >
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
              <option value="department">Department Official</option>
            </select>

            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Full Name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
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
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit" className="signup-button">Sign Up</button>
            </form>

            <div className="separator">or</div>

            <button className="google-button">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
              />
              Sign up with Google
            </button>

            <div className="login-link">
              Already have an account? <a href="/login">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;




