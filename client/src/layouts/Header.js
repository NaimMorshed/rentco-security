import React from "react";
import "../assets/styles/Header.scss";
import logo from "../assets/images/logo2.png";

export default function Header() {
  return (
    <>
      <div className="headerContainer">
        <img className="logo" src={logo} alt="" />
      </div>
    </>
  );
}
