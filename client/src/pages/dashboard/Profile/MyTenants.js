import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";

export default function MyTenants({ changePage }) {
  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Header */}
        <section className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <button className="bg-transparent border-0" onClick={() => changePage("profile")}>
              <IoArrowBackSharp />
            </button>
            <h5 className="mx-2 my-2">My Tenants</h5>
          </div>
          <div className="d-flex align-items-center">
            <button className="py-2 px-3 border-0 bg-dark text-white rounded">
              <MdOutlineCreateNewFolder style={{marginRight: "5px"}} />
              Create apartment
            </button>
          </div>
        </section>

        {/* My Tenant Section */}
        <section></section>
      </main>
    </>
  );
}
