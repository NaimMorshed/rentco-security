import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillHousesFill } from "react-icons/bs";

export default function Sidebar(props) {
  const changePage = (data) => {
    props.onPageChange(data);
  }

  const items = [
    {
      title: "Roles",
      icon: <MdDashboard />,
    },
    {
      title: "Users",
      icon: <FaUserFriends />,
    },
    {
      title: "Apartments",
      icon: <BsFillHousesFill />,
    }
  ];

  return (
    <div className="admin-sidebar">
      {items.map((item, index) => 
      <div onClick={() => changePage(item.title)}>
        <div className="sidebar-icons">
          {item.icon}
        </div>
        <h5 className="mx-2">{item.title}</h5>
      </div>)}
    </div>
  );
}
