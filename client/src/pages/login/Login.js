import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillTelephoneFill, BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import { signInWithPopup } from "firebase/auth";
import { auth, google, facebook } from "../../firebase/firebase.config";
import { UserContext } from "../../App";

import "../../assets/styles/Login.scss";
import axios from "axios";
// import Loader from "../../components/loader/Loader";

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
      const response = await axios.get(`http://localhost:5000/users/email/${email}`);

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

  const SignInWithGoogle = () => {
    signInWithPopup(auth, google)
      .then((result) => {
        const { email, displayName, photoURL } = result.user;
        setAuthentication({
          loggedIn: true,
          email: email,
          displayName: displayName,
          photoUrl: photoURL,
        });
        checkUserExistence(email);
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 5000 });
      });
  };

  const SignInWithFacebook = () => {
    signInWithPopup(auth, facebook)
      .then((result) => {
        const { email, displayName, photoURL } = result.user;
        setAuthentication({
          loggedIn: true,
          email: email,
          displayName: displayName,
          photoUrl: photoURL,
        });
        checkUserExistence(email);
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 5000 });
      });
  };

  const updateAuth = async (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    await setAuthentication(true);
  };

  return (
    <>
      <ToastContainer />
      {/* <Loader loading={true} /> */}
      <div className="login">
        <div className="loginBox">
          <h2>RENTCO</h2>

          {/* Phone */}
          <div className="buttonDiv">
            <button id="blueButton" onClick={() => navigate("/phone")}>
              <BsFillTelephoneFill className="buttonIcon" />
              Sign in with Phone
            </button>
          </div>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Facebook */}
          <div>
            <button
              className="outlineButton"
              onClick={() => SignInWithFacebook()}
            >
              <FaFacebookF className="buttonIcon" />
              Sign in with Facebook
            </button>
          </div>

          {/* Google */}
          <div>
            <button
              className="outlineButton"
              onClick={() => SignInWithGoogle()}
            >
              <BsGoogle className="buttonIcon" />
              Sign in with Google
            </button>
          </div>

          {/* Terms of Service */}
          <div className="termsOfService">
            <p>
              By continuing, you agree to our <span>Terms & Conditions.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
