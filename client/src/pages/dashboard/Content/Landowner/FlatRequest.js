import React, { useState } from "react";
import Profile from "../../Profile/Main";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import Loader from "../../../../components/loader/Loader";

export default function FlatRequest({ changePage, data }) {
  const [loader, setLoader] = useState(false);

  const handleApprove = async () => {
    setLoader(true);
    try {
      const res = await axios.post(`http://localhost:5000/chaining/approve`, data);
      if (res.status === 200) {
        alert(res.data);
        data.status = "Approved";
      } else {
        alert(res.data);
      }
    } catch (error) {
      alert("Error: ", error.message);
    }
    setLoader(false);
  };

  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Header */}
        <section className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <button
              className="bg-transparent border-0"
              onClick={() => changePage("Landowner")}
            >
              <IoArrowBackSharp />
            </button>
            <h5 className="mx-2 my-2">My Flat Request</h5>
          </div>
          {data.status === "Pending" ? (
            <div className="d-flex gap-2">
              <button className="btn btn-danger">Decline</button>
              <button onClick={handleApprove} className="btn btn-success">
                Approve
              </button>
            </div>
          ) : data.status === "Approved" ? (
            <button className="btn btn-success" disabled>
              Approved
            </button>
          ) : (
            <button className="btn btn-danger" disabled>
              Declined
            </button>
          )}
        </section>

        {/* Main Section */}
        <section>
          <Profile changePage={changePage} from="Dashboard" data={data} />
        </section>
      </main>

      {/* LOADER */}
      {loader && <Loader />}
    </>
  );
}
