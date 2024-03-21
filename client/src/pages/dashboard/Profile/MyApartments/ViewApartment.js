import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";

export default function ViewApartment({ changePage, props }) {

  const handleDelete = async () => {
    const response = await axios.delete(`http://localhost:5000/apartments/${props._id}`);
    if (response.status === 200) {
      alert("Apartment deleted successfully");
      changePage("myApartments");
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Header */}
        <section className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <button className="bg-transparent border-0" onClick={() => changePage("myApartments")}>
              <IoArrowBackSharp />
            </button>
            <h5 className="mx-2 my-2">Apartment Details</h5>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button style={{borderRadius: "30px"}} className="py-2 px-3 border-0 text-dark d-flex align-items-center justify-content-center">
              <FaRegEdit style={{marginRight: "5px"}} />
              Edit
            </button>
            <button onClick={handleDelete} style={{borderRadius: "30px"}} className="py-2 px-3 border-0 text-dark d-flex align-items-center justify-content-center">
              <MdDeleteOutline style={{marginRight: "5px"}} />
              Delete
            </button>
          </div>
        </section>

        {/* Main Section */}
        <section></section>
      </main>
    </>
  );
}
