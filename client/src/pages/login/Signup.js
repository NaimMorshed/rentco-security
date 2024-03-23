import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/Signup.scss";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../App";
import axios from "axios";

export default function Signup() {

  {/* ======================================================== */}
  {/* ======================New Sign Up=========================== */}
  {/* ======================================================== */}

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users/signup', formData);
      console.log('Signup successful');
      // Redirect or show success message
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="loginBox">
          {/* --- Heading --- */}
          <h2>RENTCO</h2>
          <p>Enter your personal details and start journey with us</p>

          {/* ======================================================== */}
          {/* ======================New Sign Up=========================== */}
          {/* ======================================================== */}

          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}
