import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';
import { IoArrowBackSharp } from "react-icons/io5";
import axios from 'axios';

import '../../../../assets/styles/Property.scss';

export default function Property({ changePage }) {

  const [property, setProperty] = useState({
    landownerId: "",
    propertyName: "",
    houseNumber: "",
    areaName: "",
    roadName: "",
    postCode: "",
    wardNumber: "",
    district: "",
    garage: false,
    guestParking: false,
    lift: false,
    securityGuard: false,
  });
  const [authentication, setAuthentication] = useContext(UserContext);
  const [propertyExist, setPropertyExist] = useState(false);

  useEffect(() => {

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProperty(previous => ({
        ...previous,
        landownerId: user._id
      }))
    } else {
      setAuthentication(false);
    }

    // Get property if exist
    const getProperty = async () => {
      const response = await axios.get(`http://localhost:5000/property/landownerId/${user._id}`);
      if (response.status === 200) {
        setProperty(response.data);
        setPropertyExist(true);
      }
    };
    getProperty();

  }, []);

  const handleCheckBox = (e) => {
    setProperty(prev => ({
      ...prev,
      [e.target.name]: !prev[e.target.name],
    }));
  }

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (propertyExist) {
      try {
        await axios.put(`http://localhost:5000/property/${property._id}`, property);
        alert("Success");
      } catch (error) {
        alert("Error");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/property", property);
        alert("Success: ", response.data.message);
      } catch (error) {
        alert("Error: ", error.message);
      }
    }
    
  };

  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Header */}
        <section className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <button className="bg-transparent border-0" onClick={() => changePage("profile")}>
              <IoArrowBackSharp />
            </button>
            <h5 className="mx-2 my-2">My Property</h5>
          </div>
        </section>

        {/* Main Section */}
        <section>
          <div className="container">
            <div className="property-container">
              <div className="property-form">
                <form onSubmit={handleSubmit}>
                  <div className="property-form-inner" >
                    <div className="left-part">
                      <div>
                        <label htmlFor="name">Property Name:
                          <input type="text" name="propertyName" id="propertyName" value={property.propertyName} onChange={handleChange} placeholder="Enter Property Name." required />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="houseNumber">House Number:
                          <input type="text" name="houseNumber" id="houseNumber" value={property.houseNumber} onChange={handleChange} placeholder="Enter House Number." required />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="areaName">Area:
                          <input type="text" name="areaName" id="areaName" value={property.areaName} onChange={handleChange} placeholder="Enter Area Name." required />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="roadName">Road Name:
                          <input type="text" name="roadName" id="roadName" value={property.roadName} onChange={handleChange} placeholder="Enter Road Name." required />
                        </label>
                      </div>
                    </div>
                    <div className="right-part">
                      <div>
                        <label htmlFor="postOffice">Post Code:
                          <input type="text" name="postCode" id="postCode" value={property.postCode} onChange={handleChange} placeholder="Enter Post Office." required />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="wardNumber">Ward Number:
                          <input type="text" name="wardNumber" id="wardNumber" value={property.wardNumber} onChange={handleChange} placeholder="Enter Ward Number." required />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="district">District Name:
                          <input type="text" name="district" id="district" value={property.district} onChange={handleChange} placeholder="Enter District Name." required />
                        </label>
                      </div>
                      <div>
                        <input type="checkbox" name="garage" id="garage" checked={property.garage} onChange={handleCheckBox} required />
                        <span style={{ marginLeft: "10px" }}>Garage</span>
                      </div>
                      <div>
                        <input type="checkbox" name="guestParking" id="guestParking" checked={property.guestParking} onChange={handleCheckBox} required />
                        <span style={{ marginLeft: "10px" }}>Guest Parking</span>
                      </div>
                      <div>
                        <input type="checkbox" name="lift" id="lift" checked={property.lift} onChange={handleCheckBox} required />
                        <span style={{ marginLeft: "10px" }}>Lift</span>
                      </div>
                      <div>
                        <input type="checkbox" name="securityGuard" id="securityGuard" checked={property.securityGuard} onChange={handleCheckBox} required />
                        <span style={{ marginLeft: "10px" }}>Security Guard</span>
                      </div>
                    </div>
                  </div>
                  {propertyExist ? <button value="submit">Update</button> : <button value="submit">Submit</button>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
