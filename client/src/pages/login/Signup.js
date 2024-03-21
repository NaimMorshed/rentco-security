import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/Signup.scss";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../App";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [authentication] = useContext(UserContext);
  const { type, phoneNumber } = location.state;

  const [inputData, setInputData] = useState({
    fullName: type === "social" ? authentication.displayName : "",
    nickname: "",
    email: type === "social" ? authentication.email : "",
    dob: "",
    gender: "male",
    district: "dhaka",
    religion: "muslim",
    phoneNumber: type === "phone" ? phoneNumber : "",
    profilePhoto: type === "social" ? authentication.photoUrl : "",
    accountType: "Landowner",
    occupation: "",
    permanentAddress: "",
    facebookId: ""
  });

  const navigateToLogin = () => {
    toast.success("User created successfully", { autoClose: 1700 });
    toast.info("Login to access dashboard", { autoClose: 2000 });
    setTimeout(() => navigate("/login"), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users", inputData);
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(inputData)); // save user in localStorage
        navigateToLogin();
      } else {
        toast.error(response.data.message, 3000);
      }
    } catch (error) {
      toast.error(error.message, 3000);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="loginBox">
          {/* --- Heading --- */}
          <h2>RENTCO</h2>
          <p>Enter your personal details and start journey with us</p>

          {/* --- Form --- */}
          <form onSubmit={handleSubmit} className="signUpForm">
            <div>
              {/* fullName */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleInput}
                value={inputData.fullName}
                required
              />
              {/* nickName */}
              <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                onChange={handleInput}
                required
              />
            </div>
            {/* email */}
            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              onChange={handleInput}
              value={inputData.email}
            />
            {/* dateOfBirth */}
            <input
              type="date"
              name="dob"
              placeholder="Date of birth"
              onChange={handleInput}
              required
            />
            <div style={{display: "flex"}}>
            {/* gender */}
              <select style={{flex: 1}} name="gender" onChange={handleInput}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {/* district */}
              <select style={{flex: 1}} name="district" onChange={handleInput}>
                <option value="barishal">Barishal</option>
                <option value="chittagong">Chittagong</option>
                <option value="dhaka" selected>Dhaka</option>
                <option value="khulna">Khulna</option>
                <option value="mymensingh">Mymensingh</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="rangpur">Rangpur</option>
                <option value="sylhet">Sylhet</option>
              </select>
              {/* religion */}
              <select style={{flex: 1}} name="religion" onChange={handleInput}>
                <option value="muslim">Muslim</option>
                <option value="hindu">Hindu</option>
                <option value="buddhist">Buddhist</option>
                <option value="christian">Christian</option>
              </select>
            </div>
            {/* occupation */}
            <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                onChange={handleInput}
                required
              />
            {/* permanent address */}
            <input
                type="text"
                name="permanentAddress"
                placeholder="Permanent Address"
                onChange={handleInput}
                required
              />
            {/* phoneNumber */}
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number (01*********)"
              onChange={handleInput}
              value={inputData.phoneNumber}
              required
            />
            {/* account type */}
            <h4 className="mt-4">Choose your account</h4>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="accountType"
                id="inlineRadio1"
                value="Landowner"
                onChange={handleInput}
                checked
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Landowner
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="accountType"
                id="inlineRadio2"
                onChange={handleInput}
                value="Tenant"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Tenant
              </label>
            </div>

            {/* submit button */}
            <input type="submit" value="Signup" />
          </form>
        </div>
      </div>
    </>
  );
}
