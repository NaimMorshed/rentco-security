import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppImage from "../../assets/images/apppic.png";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

import "../../assets/styles/Welcome.scss";
import { UserContext } from "../../App";

export default function Welcome() {
  const navigate = useNavigate();
  const [authentication, setAuthentication] = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAuthentication(true);
      navigate("/dashboard");
    } else {
      setAuthentication(false);
    }
  }, []);

  return (
    <>
      <div className="homeFull">
        <Header />
        <div className="container">
          <div className="homeContainer d-flex justify-content-around align-items-center">
            <div className="textArea">
              <span className="spanText">ALL YOUR FEATURES IN ONE APP</span>
              <h1 className="headerTitle">
                Simple <br />
                <span className="spanGradient">management</span> <br />
                software for <br />
                landlords & tenants <span className="spanDot">.</span>
              </h1>
              <span className="spanDescription">
                Keep track of your deductibles and collect rent online with
                <br />
                the #1 income and expense management app that’s proven <br />
                to make your real estate portfolio more profitable.
              </span>
              <div className="headerBtn d-flex">
                <button className="getStartBtn">Get started</button>
                <button className="loginBtn" onClick={() => navigate("/login")}>
                  Login
                </button>
              </div>
            </div>
            <div className="imgArea">
              <img className="headerImage" src={AppImage} alt="" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
