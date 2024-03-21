import React, { useContext, useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiFillDashboard,
  AiFillSetting,
  AiOutlineClose,
} from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { HiDocumentText } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import { IoIosArrowForward, IoIosNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

import "../../assets/styles/Dashboard.scss";
import logo from "../../assets/images/logo.png";

import Home from "../home/Home";
import Payment from "./Payment/Payment";
import Statement from "./Statement";
import Complaints from "./Complaints/Complaints";
import Settings from "./Settings";
import Error from "./Error";
import Apartment from "./Apartment/Apartment";
import Tenants from "./Tenants";
import Profile from "./Profile/Profile";
import { UserContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import Content from "./Content/Content";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [destination, setDestination] = useState("Dashboard");
  const [sidebar, setSidebar] = useState(true);
  const [authentication, setAuthentication] = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    } else {
      setAuthentication(false);
    }
  }, []);

  const user = {
    img: <RxAvatar />,
  };

  const handleClick = ({ text }) => {
    setDestination(text);
  };

  const ChildList = ({ icon, text }) => {
    return (
      <div
        className={destination === text && "itemSelected"}
        onClick={() => handleClick({ text })}
      >
        <div className="iconItem">{icon}</div>
        <div className="contentItem">
          <span>{text}</span>
          <span>
            <IoIosArrowForward />
          </span>
        </div>
      </div>
    );
  };

  const TitleAndList = ({ title, items }) => {
    return (
      <>
        <div className="titleList">{title}</div>
        <div className="rowItems">
          {items.map((data, index) => {
            return <ChildList key={index} icon={data.icon} text={data.text} />;
          })}
        </div>
      </>
    );
  };

  const logout = () => {
    toast.info("Logged out", { autoClose: 1700 });
    setAuthentication(false);
    localStorage.removeItem("user");
  };

  return (
    <>
      <ToastContainer />
      <div className="dashboard">
        <aside style={sidebar ? { display: "block" } : { display: "none" }}>
          {/* LOGO */}
          <div className="logo">
            <div className="closeMenu" onClick={() => setSidebar(false)}>
              <AiOutlineClose />
            </div>
            <img src={logo} alt="logo" />
            <span>RENTCO</span>
          </div>

          {/* USER INFO */}
          <div className="userInfo">
            <div className="userAvatar">
              {userData.profilePhoto ? (
                <img src={userData.profilePhoto} alt="userImg" />
              ) : (
                user.img
              )}
            </div>
            <span className="userName">{userData.fullName}</span>
            <span className="userType">{userData.accountType}</span>
          </div>

          {/* NAVIGATION LIST */}
          <div className="navList">
            <TitleAndList
              title={"General"}
              items={[
                {
                  icon: <AiFillDashboard />,
                  text: "Dashboard",
                },
                {
                  icon: <MdPayment />,
                  text: "Payment",
                },
                {
                  icon: <HiDocumentText />,
                  text: "Statement",
                },
                {
                  icon: <RiErrorWarningFill />,
                  text: "Complaints",
                },
              ]}
            />
            <TitleAndList
              title={"Discover"}
              items={[
                {
                  icon: <AiFillHome />,
                  text: "Apartment",
                },
                {
                  icon: <AiFillSetting />,
                  text: "Tenants",
                },
              ]}
            />
            <TitleAndList
              title={"Other"}
              items={[
                {
                  icon: <CgProfile />,
                  text: "Profile",
                },
                {
                  icon: <AiFillSetting />,
                  text: "Settings",
                },
              ]}
            />
          </div>

          {/* LOGOUT */}
          <div className="logoutDiv" onClick={() => logout()}>
            <FiLogOut />
            Logout
          </div>
        </aside>

        <main id="mainContent">
          {/* Nav Header */}
          <div className="fixedHeader">
            <div>
              <div
                className="hamburgerMenu"
                onClick={() => setSidebar(true)}
                style={sidebar ? { display: "none" } : { display: "block" }}
              >
                <GiHamburgerMenu />
              </div>
              <span>Home</span>
              <IoIosArrowForward />
              <span>{destination}</span>
            </div>
            <div>
              {userData.email === "morshed.naim13@gmail.com" && (
                <a
                  href="/admin"
                  className="fs-6 text-dark border p-1 rounded text-decoration-none"
                >
                  Admin
                </a>
              )}
              <IoIosNotifications />
              <TbMessageCircle2Filled />
            </div>
          </div>

          {/* Dynamic Content */}
          <main id="dynamic">
            {destination === "Home" ? (
              <Home />
            ) : destination === "Dashboard" ? (
              <>
                {userData.accountType === "Landowner" && <Content content="Landowner" />}
                {userData.accountType === "Tenant" && <Content content="Tenant" />}
              </>
            ) : destination === "Payment" ? (
              <Payment />
            ) : destination === "Statement" ? (
              <Statement />
            ) : destination === "Complaints" ? (
              <Complaints />
            ) : destination === "Profile" ? (
              <Profile />
            ) : destination === "Settings" ? (
              <Settings />
            ) : destination === "Apartment" ? (
              <Apartment />
            ) : destination === "Tenants" ? (
              <Tenants />
            ) : (
              <Error />
            )}
          </main>
        </main>
      </div>
    </>
  );
}
