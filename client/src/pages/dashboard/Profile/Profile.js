import React, { useState } from 'react';
import Main from './Main';
import MyApartments from './MyApartments/MyApartments';
import MyTenants from './MyTenants';
import FavoritesLandowner from './FavoritesLandowner';
import Verification from './Verification';
import CreateApartment from './MyApartments/CreateApartment';
import Property from './MyApartments/Property';
import ViewApartment from "./MyApartments/ViewApartment.js";

export default function Profile() {
  const [page, setPage] = useState("profile");
  const [data, setData] = useState(null);

  const handlePageChange = (page, props = null) => {
    setPage(page);
    setData(props);
  }

  return (
    <>
      {page === "profile" && <Main changePage={handlePageChange} />}
      {page === "myApartments" && <MyApartments changePage={handlePageChange} />}
      {page === "createApartment" && <CreateApartment changePage={handlePageChange} />}
      {page === "myTenants" && <MyTenants changePage={handlePageChange} />}
      {page === "favoritesLandowner" && <FavoritesLandowner changePage={handlePageChange} />}
      {page === "verification" && <Verification changePage={handlePageChange} />}
      {page === "property" && <Property changePage={handlePageChange} />}
      {page === "viewApartment" && <ViewApartment changePage={handlePageChange} props={data} />}
    </>
  )
}
