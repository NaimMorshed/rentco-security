import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, google, facebook } from "../../firebase/firebase.config";
import { UserContext } from "../../App";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
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

  const [isCaptchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isCaptchaVerified) {
        const response = await axios.post("http://localhost:5000/users/login", formData);
        alert(response.data.message);
        console.log(response.data);
        // console.log("Token:", response.data.token);
        // navigate("/dashboard");
        // Store token in localStorage and redirect or update state to logged in
      }
      else {
        alert('Please complete the reCAPTCHA verification');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="loginBox">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <div style={{ position: "relative" }}>
                <FiUser
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "8px",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="rentco@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div style={{ position: "relative" }}>
                <MdLockOutline
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "8px",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Type your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <ReCAPTCHA
              sitekey="6LdLg6IpAAAAAO5v9H274lm5_4CFMK-lVS6sXNWE"
              onChange={onChange}
            />
            <button type="submit">Login</button>
          </form>

          <Link to="/signup">Don't Have an account?</Link>
        </div>
      </div>
    </>
  );
}
