import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/fetchApi";
import { toast } from "react-toastify";
import "./css/register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      toast.error("Please select a role");
      return;
    }

    try {
      const res = await register(form);

      if (res?.status === 201) {
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us in a few steps</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="CUSTOMER">User</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
