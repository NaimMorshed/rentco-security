import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";

export default function UpdateUser({ handleClose, id }) {
  const [data, setData] = useState({});
  
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:5000/users/id/${id}`);
        setData(response.data);
      }
      fetchData();
    } catch (error) {
      alert("Error: ", error.message);
    }
  }, [])

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/users/${data._id}`, data);
      alert(response.data.message);
      handleClose();
    } catch (error) {
      alert(error.message);
    }
  }

  const handleInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <main className='update-user row'>
          <section className='col-md-6'>
            <div>
              <label htmlFor="_id">ID</label>
              <input type="text" name="_id" value={data._id} onChange={handleInput} readOnly />
            </div>
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" name="fullName" value={data.fullName} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="nickname">Nickname</label>
              <input type="text" name="nickname" value={data.nickname} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" value={data.email} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="dob">Date Of Birth</label>
              <input type="text" name="dob" value={data.dob} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <input type="text" name="gender" value={data.gender} onChange={handleInput} />
            </div>
          </section>
          <section className='col-md-6'>
            <div>
              <label htmlFor="district">District</label>
              <input type="text" name="district" value={data.district} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="religion">Religion</label>
              <input type="text" name="religion" value={data.religion} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="occupation">Occupation</label>
              <input type="text" name="occupation" value={data.occupation} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="permanentAddress">Permanent Address</label>
              <input type="text" name="permanentAddress" value={data.permanentAddress} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" name="phoneNumber" value={data.phoneNumber} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="accountType">Account Type</label>
              <input type="text" name="accountType" value={data.accountType} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="registrationDate">Registration Date</label>
              <input type="text" name="registrationDate" value={data.registrationDate} onChange={handleInput} readOnly />
            </div>
          </section>
        </main>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Update
          </Button>
        </Modal.Footer>
      </form>
    </>
  )
}
