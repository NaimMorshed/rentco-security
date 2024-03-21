import { useState } from "react";
import Main from "./Main";
import View from "./View";

export default function Apartment() {
  const [page, setPage] = useState("main");
  const [data, setData] = useState(null);

  const handlePageChange = (page, data = null) => {
    setPage(page);
    setData(data);
  }

  return (
    <>
      {page === "main" && <Main changePage={handlePageChange} />}
      {page === "view" && <View changePage={handlePageChange} props={data} />}
    </>
  );
}
