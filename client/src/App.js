import React, { createContext, useEffect, useState } from "react";
import Routes from "./routes/Routes";

import "./assets/styles/App.scss";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext();

function App() {
  const [authentication, setAuthentication] = useState(false);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     setAuthentication(true);
  //   } else {
  //     setAuthentication(false);
  //   }
  // }, []);

  return (
    <>
      <UserContext.Provider value={[authentication, setAuthentication]}>
        <Routes />
      </UserContext.Provider>
    </>
  );
}

export default App;
