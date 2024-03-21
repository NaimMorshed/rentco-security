import { useState } from "react";
import "../../assets/styles/Admin.scss";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Admin() {
  const [page, setPage] = useState("write login here");

  const handleLoginData = (data) => {
    setPage(data);
  }

  return (
    <>
      { page === "login" ? <Login onDataUpdate={handleLoginData} /> : <Dashboard /> }
    </>
  );
}
