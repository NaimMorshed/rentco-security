import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

export default function Header({ pageTitle }) {
  return (
    <div className="admin-header">
      <div className="d-flex">
        <div className="header-icon">
          <MdOutlineMenu />
        </div>
        <div>
          <h4>{pageTitle}</h4>
        </div>
      </div>
      <div className="header-icon">
        <IoSettings />
      </div>
    </div>
  );
}
