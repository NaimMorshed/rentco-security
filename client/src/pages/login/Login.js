import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillTelephoneFill, BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, google, facebook } from "../../firebase/firebase.config";
import { UserContext } from "../../App";
import axios from "axios";
import "../../assets/styles/Login.scss";

export default function Login() {
  const navigate = useNavigate();

  const [authentication, setAuthentication] = useContext(UserContext);

  // <---- Auto redirect to dashboard ---->
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAuthentication(true);
      navigate("/dashboard");
    } else {
      setAuthentication(false);
    }
  }, []);

  const navigateToDashboard = (data) => {
    updateAuth(data);
    toast.success(`Welcome ${data.nickname}!`, { autoClose: 1700 });
    setTimeout(() => navigate("/dashboard"), 3000);
    navigate("/dashboard");
  };

  const checkUserExistence = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/email/${email}`
      );

      response.data.length === 0
        ? navigate("/signup", {
            replace: true,
            state: { type: "social", phoneNumber: "" },
          })
        : navigateToDashboard(response.data[0]);
    } catch (error) {
      toast.error(error.message, { autoClose: 1700 });
    }
  };

  const updateAuth = async (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    await setAuthentication(true);
  };

  // ================================+++===============================
  // ==============================New Code============================
  // ================================+++===============================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", formData);
      alert(response.data.message);
      // console.log("Token:", response.data.token);
      // navigate("/dashboard");
      // Store token in localStorage and redirect or update state to logged in
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="loginBox">
          <h2>RENTCO</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form>

          <Link to="/signup">Don't Have an account?</Link>
        </div>
      </div>
    </>
  );
}
