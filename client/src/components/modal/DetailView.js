import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DetailView({ id }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/id/${id}`);
        setData(response.data);
      } catch (error) {
        alert("Error: ", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data && (
        <>
          <div className="d-flex justify-content-center align-items-center my-3">
            <img className="border rounded shadow" src={data.profilePhoto} alt="img" />
          </div>
          <div className="row">
            <div className="col-md-4 text-end">
              <p>Full Name:</p>
              <p>Nickname:</p>
              <p>Email:</p>
              <p>Dob:</p>
              <p>Gender:</p>
              <p>District</p>
              <p>Religion:</p>
              <p>Phone Number:</p>
              <p>Account Type:</p>
              <p>Registration Date:</p>
            </div>
            <div className="col-md-8 text-start">
              <p>{data.fullName}</p>
              <p>{data.nickname}</p>
              <p>{data.email}</p>
              <p>{data.dob}</p>
              <p>{data.gender}</p>
              <p>{data.district}</p>
              <p>{data.religion}</p>
              <p>{data.phoneNumber}</p>
              <p>{data.accountType}</p>
              <p>{data.registrationDate}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
