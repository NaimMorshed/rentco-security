import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

export default function Dashboard() {
  const [page, setPage] = useState("Roles");

  const handlePageChange = (data) => {
    setPage(data);
  }

  return (
    <div>
      <Header pageTitle={page} />
      <div className='d-flex'>
        <Sidebar onPageChange={handlePageChange} />
        <MainContent pageToShow={page} />
      </div>
    </div>
  )
}
