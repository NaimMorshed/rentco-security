import React, { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { BiCheckCircle } from "react-icons/bi";
import { format } from 'date-fns';
import { RxCrossCircled } from "react-icons/rx";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import "../../../assets/styles/Dashcontent.scss";

export default function Landowner({ changePage }) {
  const [loader, setLoader] = useState(false);
  const [request, setRequest] = useState(null);
  
  useEffect(() => {
    setLoader(true);

    const getRequest = async (id) => {
      const res = await axios.get("http://localhost:5000/flatRequest");
      const filteredData = res.data.filter(item => item.landownerId === id);
      setRequest(filteredData);
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getRequest(user._id);
    } else
      alert("Error");
    
    setLoader(false);
  }, []);

  return (
    <>
      <div className="container">
        <div className="dashBoardContainer">
          <div className="row">
            {/* Total Tenants */}
            <div className="col-sm-3 mb-3 mb-sm-2">
              <div className="card">
                <div onClick={() => changePage("Tenant List")} className="card-body">
                  <BsFillPeopleFill className="dashCardIcons" size={40} />
                  <span className="card-title">TOTAL TENANTS</span>
                  <span className="card-text">07</span>
                </div>
              </div>
            </div>
            {/* Total Payment */}
            <div className="col-sm-3 mb-3">
              <div className="card">
                <div onClick={() => changePage("Apartment List")} className="card-body">
                  <ImHome className="dashCardIcons" size={40} />
                  <span className="card-title">TOTAL APARTMENTS</span>
                  <span className="card-text">
                    15
                  </span>
                </div>
              </div>
            </div>
            {/* Payment Received */}
            <div className="col-sm-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <GiReceiveMoney className="dashCardIcons" size={40} />
                  <span className="card-title">PAYMENT RECEIVED</span>
                  <span className="card-text">
                    <TbCurrencyTaka className="taka-icon" />
                    80,000
                  </span>
                </div>
              </div>
            </div>
            {/* Payment Due */}
            <div className="col-sm-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <GiPayMoney className="dashCardIcons" size={40} />
                  <span className="card-title">PAYMENT DUE</span>
                  <span className="card-text">
                    <TbCurrencyTaka className="taka-icon" />
                    70,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* Flat Requests */}
        <div className="flatContainer">
          <h2>Flat Requests</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Flat No.</th>
                <th scope="col">Category</th>
                <th scope="col">Member</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {request && request.map((item, index) => (
                <tr onClick={() => changePage("Flat Request", item)} className="tableRow" key={index}>
                  <td>{index+1}</td>
                  <td>{item.unitNumber}</td>
                  <td>{item.category}</td>
                  <td>{item.member}</td>
                  <td>
                    {item.tenantPhoto? 
                      <img className="tenant-icon" style={{borderRadius: "50%"}} width={"23px"} src={item.tenantPhoto} alt="img" /> : 
                      <RxAvatar className="tenant-icon" size={25} />}
                    {item.tenantName}
                  </td>
                  <td>{format(item.date, 'dd MMM yyyy')}</td>
                  <td>
                    {item.status === "Approved" ? (
                      <BiCheckCircle
                        style={{ color: "green", margin: "0px 10px 0px 10px" }}
                      />
                    ) : item.status === "Declined" ? (
                      <RxCrossCircled
                        style={{ color: "orange", margin: "0px 10px 0px 10px" }}
                      />
                    ) : <MdAccessTimeFilled
                    style={{ color: "gray", margin: "0px 5px 0px 5px" }}
                  />}
                    {item.status === "Approved" ? (
                      <span style={{ color: "green" }}>Approved</span>
                    ) : item.status === "Declined" ? (
                      <span style={{ color: "orange" }}>Declined</span>
                    ) : <span style={{ color: "gray" }}>Pending</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LOADER */}
      {loader && <Loader />}
    </>
  );
}
