import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Table } from "react-bootstrap";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Loader from "../../../../components/loader/Loader";
import axios from "axios";

export default function TenantList({ changePage }) {
  const [tenantsData, setTenantsData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const getTenantList = async (id) => {
      const res = await axios.post(`http://localhost:5000/chaining/getTenants/${id}`);
      setTenantsData(res.data);
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getTenantList(user._id);
    };

    setLoading(false);
  }, [])

  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Header */}
        <section className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <button
              className="bg-transparent border-0"
              onClick={() => changePage("Landowner")}
            >
              <IoArrowBackSharp />
            </button>
            <h5 className="mx-2 my-2">My Tenants</h5>
          </div>
          <div className="d-flex align-items-center">
            <button className="py-2 px-3 border-0 bg-dark text-white rounded">
              <MdOutlineCreateNewFolder style={{ marginRight: "5px" }} />
              Manually insert tenants
            </button>
          </div>
        </section>

        {/* My Tenant Section */}
        <section className="mt-5 py-2">
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Tenant Name</th>
                <th>Unit No.</th>
                <th>Phone No.</th>
                <th>Tenant Type</th>
                <th>Member</th>
                <th>Rent</th>
              </tr>
            </thead>
            <tbody>
              {tenantsData && tenantsData.map((item, index) => (
                <tr>
                  <td>{index+1}</td>
                  <td className="d-flex align-items-center">
                    <img 
                      style={{borderRadius: "50%", marginRight: "5px"}} 
                      width={"20px"} 
                      height={"20px"}
                      src={item.profilePhoto} 
                      alt=".." 
                    />
                    <span>{item.fullName}</span>
                  </td>
                  <td>{item.unitNumber}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.tenantType}</td>
                  <td>{item.member}</td>
                  <td>{item.rent}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </main>

      {/* LOADER */}
      {isLoading && <Loader />}
    </>
  );
}
