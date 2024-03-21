import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";

export default function FavoritesLandowner({ changePage }) {
  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Back button */}
        <section className="d-flex align-items-center">
          <button className="bg-transparent border-0" onClick={() => changePage("profile")}>
            <IoArrowBackSharp />
          </button>
          <h5 className="mx-2 my-2">My Favorites</h5>
        </section>

        <section></section>
      </main>
    </>
  );
}
