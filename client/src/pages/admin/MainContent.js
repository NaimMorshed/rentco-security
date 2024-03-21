import React from "react";
import Roles from "./Roles";
import Users from "./Users";
import Apartments from "./Apartments";

export default function MainContent({ pageToShow }) {
  return (
    <div className="admin-main-content">
      {pageToShow === "Roles" && <Roles />}
      {pageToShow === "Apartments" && <Apartments />}
      {pageToShow === "Users" && <Users />}
    </div>
  );
}
