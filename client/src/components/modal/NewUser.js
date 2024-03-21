import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

export default function NewUser({ handleClose }) {
  const [inputData, setInputData] = useState({
    fullName: "",
    nickname: "",
    email: "",
    dob: "",
    gender: "male",
    district: "barishal",
    religion: "muslim",
    phoneNumber: "",
    profilePhoto: "blank",
    accountType: "Landowner",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users", inputData);
      console.log("Response: ", response.data.message);
      handleClose();
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <>
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
          required
        />
        {/* dateOfBirth */}
        <input
          type="date"
          name="dob"
          placeholder="Date of birth"
          onChange={handleInput}
          required
        />
        {/* gender */}
        <select name="gender" onChange={handleInput}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {/* district */}
        <select name="district" onChange={handleInput}>
          <option value="barishal">Barishal</option>
          <option value="chittagong">Chittagong</option>
          <option value="dhaka">Dhaka</option>
          <option value="khulna">Khulna</option>
          <option value="mymensingh">Mymensingh</option>
          <option value="rajshahi">Rajshahi</option>
          <option value="rangpur">Rangpur</option>
          <option value="sylhet">Sylhet</option>
        </select>
        {/* religion */}
        <select name="religion" onChange={handleInput}>
          <option value="muslim">Muslim</option>
          <option value="hindu">Hindu</option>
          <option value="buddhist">Buddhist</option>
          <option value="christian">Christian</option>
        </select>
        {/* phoneNumber */}
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
}
