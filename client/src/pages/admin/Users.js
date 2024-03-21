import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import BootstrapModal from "../../components/modal/BoostrapModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    data: "",
  });

  const handleShowModal = (title, data) => {
    setModalData({
      title: title,
      data: data,
    });
    setShowModal(true);
  };
  
  const handleCloseModal = () => setShowModal(false);

  const handleSearch = (data) => {};

  const formatTime = (time) => {
    const splittedArray = time.split("T");
    const date = splittedArray[0];
    return format(date, "dd MMM yyyy");
  };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/users")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {/* Header */}
      <div className="user-header">
        {/* left portion search */}
        <div>
          <input
            type="search"
            name="search"
            onChange={handleSearch}
            placeholder="Search"
          />
          <div class="search-icon">
            <CiSearch />
          </div>
        </div>
        {/* right portion */}
        <div className="d-flex">
          {/* filter */}
          <div style={{ cursor: "pointer" }} className="d-flex mx-5">
            <div className="user-header-icon">
              <IoFilterSharp />
            </div>
            <div className="user-header-text">
              <span>ADD FILTER</span>
            </div>
          </div>
          {/* create */}
          <div
            onClick={() => handleShowModal("Create new user", "")}
            style={{ cursor: "pointer" }}
            className="d-flex"
          >
            <div className="user-header-icon">
              <IoMdAdd />
            </div>
            <div className="user-header-text">
              <span>CREATE NEW USER</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================== */}

      {/* Main Table */}
      <table className="table main-table">
        <thead className="bg-dark text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Role</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Registration Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.fullName}</td>
                  <td>{user.accountType}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{formatTime(user.registrationDate)}</td>
                  <td className="d-flex flex-row gap-3">
                    <button 
                      onClick={() => handleShowModal("Detail view", user._id)} 
                      className="user-table-btn"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleShowModal("Update user", user._id)} 
                      className="user-table-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleShowModal("Delete user", user._id)}
                      className="user-table-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* MODAL */}
      <BootstrapModal
        showModal={showModal}
        handleClose={handleCloseModal}
        options={modalData}
      />
    </>
  );
}
