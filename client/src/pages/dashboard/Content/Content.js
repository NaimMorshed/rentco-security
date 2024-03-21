import React, { useState } from 'react'
import Landowner from './Landowner';
import Tenant from './Tenant';
import TenantList from "./Landowner/TenantList";
import ApartmentList from './Landowner/ApartmentList';
import FlatRequest from './Landowner/FlatRequest';

export default function Content(props) {
  const { content } = props;
  const [page, setPage] = useState(content);
  const [data, setData] = useState(null);

  const handlePageChange = (page, options = null) => {
    setPage(page);
    setData(options);
  };

  return (
    <>
      {page === "Landowner" && <Landowner changePage={handlePageChange} />}
      {page === "Tenant" && <Tenant changePage={handlePageChange} />}
      {page === "Tenant List" && <TenantList changePage={handlePageChange} data={data} />}
      {page === "Apartment List" && <ApartmentList changePage={handlePageChange} />}
      {page === "Flat Request" && <FlatRequest changePage={handlePageChange} data={data} />}
    </>
  )
}
