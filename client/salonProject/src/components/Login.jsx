import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../api/fetchApi";
import { toast } from "react-toastify";
import "./css/Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userLogin({
        username: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      sessionStorage.setItem("token",res.data.token)

      if (res.data.is_superuser) {
        navigate("/admin/dash");
      } else if (res.data.is_staff) {
        navigate("/staff/home");
      } else {
        navigate("/");
      }

      toast.success("Login successful");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };
    
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-footer">
          <Link to="/forgot-password/">Forgot password?</Link>
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
