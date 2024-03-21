import React from 'react';
import Apartment from '../../Profile/MyApartments/MyApartments';

export default function ApartmentList({ changePage }) {
  return (
    <>
      <Apartment changePage={changePage}/>
    </>
  )
}
