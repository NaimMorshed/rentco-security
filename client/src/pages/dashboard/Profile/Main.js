import React, { useEffect, useState } from "react";
import { profileData } from "../../../assets/data/profileData";
import { MdVerified } from "react-icons/md";
import { FaStar, FaRegStar, FaRegEdit } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import axios from "axios";
import "../../../assets/styles/Profile.scss";

export default function Main({ changePage, from, data }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (from === "Dashboard") {
      const getUser = async () => {
        const res = await axios.get(`http://localhost:5000/users/id/${data.tenantId}`);
        if (res.status === 200) {
          setUserData(res.data);
        } else {
          alert("Error fetching data");
        }
      };
      getUser();
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
      } else {
        alert("Error fetching localStorage data!");
      }
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="profile-container">

          <div className="profile-info">
            <div className="profile-pic">
              <img style={{ weight: '180px', height: '180px', borderRadius: '10px' }} src={userData.profilePhoto} alt="profile pic" />
            </div>

            <div className="image-info">
              <div className="profile-title">
                <h4>{userData.fullName}</h4>
                <h6 style={{ color: '#0FA859' }}><MdVerified /> Verified</h6>
              </div>
              <h6>{profileData.occupation}</h6>
              <h6 style={{ opacity: '0.75', marginTop: '20px' }}>RANKINGS</h6>
              <h5>{profileData.rating} <FaStar className="star-icon" /><FaStar className="star-icon" /><FaStar className="star-icon" /><FaStar className="star-icon" /><FaRegStar className="star-icon" /></h5>
              {from === "Dashboard" ? "" : (
                <button
                  className="verify-button"
                  onClick={() => changePage("verification")}
              >
                <MdVerifiedUser />
                Verify Documents
              </button>
              )}
            </div>

            {from === "Dashboard" ? "" : (
              <div className="edit-section">
                <div className="edit-profile">
                  <button className="edit-profile-button"><FaRegEdit /> Edit profile</button>
                </div>
                <div className="edit-property">
                  <button onClick={() => changePage("property")} className="edit-property-button"><FaRegEdit /> Edit property</button>
                </div>
            </div>
            )}

          </div>

          {/* Landowner Buttons */}
          {userData.accountType === "Landowner" && (
            from === "Dashboard" ? "" : (
              <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
                <button
                  className="btn btn-info text-white"
                  onClick={() => changePage("myApartments")}
                >
                  My Apartments
                </button>
                <button
                  className="btn btn-info text-white"
                  onClick={() => changePage("myTenants")}
                >
                  My Tenants
                </button>
                <button
                  className="btn btn-info text-white"
                  onClick={() => changePage("favoritesLandowner")}
                >
                  Favorites
                </button>
              </div>
            )
          )}
          {/* =========================================== */}

          {/* Information */}
          <div className="inner-profile-info">

            {/* Contact Info */}
            <div className="contact-info">
              <h6 className="info-title">CONTACT INFORMATION</h6>
              <p><span className="inner-title">Phone:</span> {userData.phoneNumber}</p>
              <p><span className="inner-title">Email:</span> {userData.email}</p>
              <p><span className="inner-title">Facebook:</span> {userData.facebookId}</p>
              <p><span className="inner-title">Permanent Address:</span> {userData.permanentAddress}</p>
            </div>

            {/* Basic Info */}
            <div className="basic-info">
              <h6 className="info-title">BASIC INFORMATION</h6>
              <p><span className="inner-title">Birthday:</span> {userData.dob}</p>
              <p><span className="inner-title">Gender:</span> {userData.gender}</p>
              <p><span className="inner-title">Religion:</span> {userData.religion}</p>
              <p><span className="inner-title">Occupation:</span> {userData.occupation}</p>
            </div>
          </div>

          {/* Rental History */}
          <div className="rental-history">
            <h6 className="info-title">Rental HISTORY</h6>
            <div className="record-history">{
              profileData.previous_record.map((record) => (
                <div>
                  <h5>{record.houseName} <span className="year">{record.rentYear}-{record.leaveYear}</span></h5>
                  <h6 className="record-address">{record.address}</h6>
                </div>
              ))
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
