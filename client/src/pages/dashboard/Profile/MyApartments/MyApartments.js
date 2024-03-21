import React, { useContext, useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import ApartmentImg from "../../../../assets/images/apartment.jpg";
import AvatarImg from "../../../../assets/images/profile.jpg";
import { FaPhoneAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoCalendarNumber } from "react-icons/io5";
import axios from "axios";
import { UserContext } from "../../../../App";
import Table from 'react-bootstrap/Table';
import "../../../../assets/styles/MyApartments.scss";

export default function MyApartments({ changePage }) {
  const [authentication, setAuthentication] = useContext(UserContext);
  const [data, setData] = useState(null);

  useEffect(() => {

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {

      // If user true, get apartments
      const getApartments = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/apartments`);
          if (response.status === 200) {
            const filteredData = response.data.filter(apartment => apartment.landownerId === user._id);
            setData(filteredData);
          }
        } catch (error) {
          alert("Error fetching data");
        }
      };
      getApartments();

    } else {
      setAuthentication(false);
    }

  }, []);

  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Header */}
        <section className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <button
              className="bg-transparent border-0"
              onClick={() => changePage("profile")}
            >
              <IoArrowBackSharp />
            </button>
            <h5 className="mx-2 my-2">My Apartments</h5>
            <span className="text-muted">| Total: {data? data.length: 0}</span>
          </div>
          <div className="d-flex align-items-center">
            <button
              onClick={() => changePage("createApartment")}
              className="py-2 px-3 border-0 bg-dark text-white rounded"
            >
              <MdOutlineCreateNewFolder style={{ marginRight: "5px" }} />
              Create apartment
            </button>
          </div>
        </section>

        {/* Apartment Section */}
        <section className="mt-4">


          {/* <Table responsive>
            <thead>
              <tr>
                <th>Unit No.</th>
                <th>Apartments</th>
                <th>Tenant</th>
                <th>Tenant Phone</th>
                <th>Rent</th>
                <th>Avg Electricity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>234</td>
                <td>
                  <div className="apartment-head">
                    <div className="image">
                      <img width="20px" height="20px" src={ApartmentImg} alt="img" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table> */}



          {data && data.map((item, index) => (
          <>
            <div 
              onClick={() => changePage("viewApartment", item)} 
              key={index} 
              className="horizontal-card"
            >
            {/* Main image */}
              <img src={ApartmentImg} alt="img" />
              <div className="card-content">
                {/* First section */}
                <div>
                  <h3 className="card-title mb-3">
                    Unit No: {item.unitNumber} ({item.floor}<sup>th</sup> Floor)
                  </h3>
                  <div className="card-body">
                    <div className="card-elements">
                      <img src={AvatarImg} alt="" />
                      <span>{item.tenantName}</span>
                    </div>
                    <div className="card-elements">
                      <FaPhoneAlt />
                      <span>{item.tenantPhone}</span>
                    </div>
                    <div className="card-elements">
                      <IoCalendarNumber />
                      <span>{item.joiningDate}</span>
                    </div>
                  </div>
                </div>

                {/* Second section */}
                <div>
                  <div className="card-body d-flex flex-column justify-content-center">
                    <div className="card-elements">
                      <TbCurrencyTaka
                        style={{ fontSize: "37px", marginRight: "-8px" }}
                      />
                      <div>
                        <span style={{ fontSize: "30px" }}>{item.rent}</span>
                        <span style={{ fontSize: "14px" }}>/month</span>
                      </div>
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
          </>))}
        </section>
      </main>
    </>
  );
}
