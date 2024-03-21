import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoArrowBackSharp } from "react-icons/io5";
import { RiHeartAddLine } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineDinnerDining, MdOutlineMeetingRoom } from "react-icons/md";
import { MdLocalParking } from "react-icons/md";
import { FaRegHandPointer, FaCheck } from "react-icons/fa";
import ApartImage from "../../../assets/images/apartment.jpg";
import ApartImage2 from "../../../assets/images/profile.jpg";
import { BiBath } from "react-icons/bi";
import "../../../assets/styles/View.scss";
import ImageCarousel from "../../../components/carousel/ImageCarousel";
import axios from "axios";
import { UserContext } from "../../../App";
import Loader from "../../../components/loader/Loader";

export default function View({ changePage, props }) {
  const [authentication, setAuthentication] = useContext(UserContext);
  const images = [ApartImage, ApartImage2];
  const [dbRequest, setDbRequest] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [landowner, setLandowner] = useState(null);
  const [applyNowBtn, setApplyNowBtn] = useState(true);
  const [loader, setLoader] = useState(false);
  const [request, setRequest] = useState({
    apartmentId: "",
    landownerId: "",
    tenantId: "",
    unitNumber: "",
    tenantName: "",
    tenantPhoto: "",
    category: "",
    member: 0,
  });

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, type, value } = e.target;

    // Prevent negative values for the "unitNumber" field
    const sanitizedValue = type === 'number' ? Math.max(0, parseFloat(value)) : value;

    setRequest((prevData) => ({
      ...prevData,
      [name]: sanitizedValue,
    }));

  };

  const getDbRequest = async () => {
    const res = await axios.get("http://localhost:5000/flatRequest");
    if (res.status === 200) {
      setDbRequest(res.data);
    } else {
      alert("Error");
    }
  };

  const getLandowner = async () => {
    const response = await axios.get(
      `http://localhost:5000/users/id/${props.landownerId}`
    );
    if (response.status === 200) {
      setLandowner(response.data);
    } else {
      alert("Error fetching landowner data!");
    }
  };

  const matchData = () => {
    dbRequest.forEach((item) => {
      const { apartmentId, tenantId, unitNumber } = item;
      if (apartmentId === props._id && tenantId === userData._id && unitNumber === String(props.unitNumber)) {
        setApplyNowBtn(false);
      }
    });
  };

  const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    } else {
      setAuthentication(false);
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();

    setLoader(true);
    setRequest((previous) => ({
      ...previous,
      apartmentId: props._id,
      landownerId: landowner._id,
      tenantId: userData._id,
      unitNumber: props.unitNumber,
      tenantName: userData.fullName,
      tenantPhoto: userData.profilePhoto,
    }));

    try {
      const response = await axios.post("http://localhost:5000/flatRequest", request);
      if (response.status === 200) 
        alert(response.data);
      else 
        alert(response.data);
    } catch (error) {
      alert("Error");
      console.log(error);
    }
    setLoader(false);
  }; 
  
  useEffect(() => {
    setLoader(true);
    // Get all request from db
    getDbRequest();
    // Get Landowner
    getLandowner();
    // Get User
    getUserFromLocalStorage();
    // Match data for apply now btn
    setLoader(false);
  }, []);

  useEffect(() => {
    if (dbRequest) {
      matchData();
    }
  }, [dbRequest]);

  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Header */}
        <section className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <button
              className="bg-transparent border-0"
              onClick={() => changePage("main")}
            >
              <IoArrowBackSharp />
            </button>
            <h5 className="mx-2 my-2">Apartment View</h5>
          </div>
          <div className="d-flex align-items-center">
            <button
              style={{ borderRadius: "30px" }}
              className="py-2 px-3 border-0 text-dark"
            >
              <RiHeartAddLine style={{ marginRight: "5px" }} />
              Save
            </button>
          </div>
        </section>

        {/* Main Section */}
        <section className="my-4">
          <div className="container">
            <div className="apart-view-container">
              <div className="apart-title">
                <h3>{props.title}</h3>
                <h6 style={{ opacity: "0.75" }}>{props.address}</h6>
              </div>

              {/* Image Section */}
              <div className="image-section">
                <ImageCarousel images={images} />
              </div>

              {/* Apart Details */}
              <div className="apart-details">
                <div className="apart-inner">
                  <h6 style={{ opacity: "0.75" }}>Rent Price</h6>
                  <h5>
                    <TbCurrencyTaka />
                    {props.rent}
                    <span style={{ opacity: "0.75" }}>/month</span>
                  </h5>

                  <div className="internal-details">
                    <div className="row-content">
                      <div className="row1">
                        <div className="bedroom">
                          <span className="option-title">Bed: </span>
                          <span className="icon-title">
                            {props.bedRooms}
                          </span>{" "}
                          <span className="icon">
                            <IoBedOutline />
                          </span>
                        </div>
                        <div className="bathroom">
                          <span className="option-title">Bath: </span>
                          <span className="icon-title">
                            {props.bathRooms}
                          </span>{" "}
                          <span className="icon">
                            <BiBath />
                          </span>
                        </div>
                        <div className="area">
                          <span className="option-title">Area: </span>
                          <span className="icon-title">{props.area} sqft</span>
                        </div>
                      </div>
                      <div className="row2">
                        <div className="drawingroom">
                          <span className="option-title">Drawing: </span>
                          <span className="icon-title">
                            {props.drawingRooms}
                          </span>{" "}
                          <span className="icon">
                            <MdOutlineMeetingRoom />
                          </span>
                        </div>
                        <div className="diningroom">
                          <span
                            style={{ marginLeft: "-30px" }}
                            className="option-title"
                          >
                            Dining:{" "}
                          </span>
                          <span className="icon-title">
                            {props.diningSpace}
                          </span>{" "}
                          <span className="icon">
                            <MdOutlineDinnerDining />
                          </span>
                        </div>
                        <div className="parking">
                          <span className="option-title">Parking: </span>
                          <span className="icon-title">
                            {props.parking}
                          </span>{" "}
                          <span className="icon">
                            <MdLocalParking />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="description">
                      <h5>Description:</h5>
                      <span>{props.description}</span>
                    </div>
                  </div>
                </div>

                {/* Landowner Info */}
                {landowner && (
                  <div className="land-owner-info">
                    <div className="image-section">
                      <h6>Landowner</h6>
                      <img src={landowner.profilePhoto} alt="" />
                      <h6 style={{marginTop: "20px"}} className="land-owner-name">{landowner.fullName}</h6>
                      <span className="phone">Phone:</span>{" "}
                      <span style={{ opacity: "0.75" }}>{landowner.phoneNumber}</span>
                    </div>
                    {userData.accountType === "Tenant" && (
                      <div className="apply-btn">
                        {applyNowBtn ? (
                          <button onClick={() => setShowModal(true)}>
                            <FaRegHandPointer /> Apply Now
                          </button>
                        ) : (
                          <button>
                            <FaCheck /> Applied
                          </button>
                        )}
                      </div>
                    )}
                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* LOADER */}
      {loader && <Loader />}
      
      {/* MODAL */}
      <Modal show={showModal} onHide={handleCloseModal}>

        <Modal.Header closeButton>
          <Modal.Title>Choose category and member</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleCreateRequest}>
          <Modal.Body>
            <div className="modal-body-form">
              <label htmlFor="category">Category: </label>
              <select name="category" value={request.category} onChange={handleInputChange}>
                <option value="">Select Type</option>
                <option value="Family">Family</option>
                <option value="Bachelor">Bachelor</option>
              </select>
              <label htmlFor="member">Total member:</label>
              <input type="number" name="member" value={request.member} onChange={handleInputChange} />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" onClick={handleCloseModal}>
              Apply for apartment
            </Button>
          </Modal.Footer>
        </form>

      </Modal>
    </>
  );
}
