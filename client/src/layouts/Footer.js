import React from "react";
import "../assets/styles/Footer.scss";
import { FaFacebookSquare, FaYoutube, FaInstagram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="footerContainer">
        <div className="footerLeft">
          <ul className="footerIcons">
            <li className="iconList">
              <a href="#">
                <FaFacebookSquare style={{ color: "white" }} size={20} />
              </a>
            </li>
            <li className="iconList">
              <a href="#">
                <BsTwitter style={{ color: "white" }} size={20} />
              </a>
            </li>
            <li className="iconList">
              <a href="#">
                <FaYoutube style={{ color: "white" }} size={20} />
              </a>
            </li>
            <li className="iconList">
              <a href="#">
                <FaInstagram style={{ color: "white" }} size={20} />
              </a>
            </li>
          </ul>
        </div>
        <div className="footerRight">
          <span>&copy; {currentYear} RENTCO, Inc. All rights reserved.</span>
        </div>
      </div>
    </>
  );
}
