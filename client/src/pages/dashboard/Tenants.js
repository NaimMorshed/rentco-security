import { useEffect, useState } from "react";
import tenants from "../../assets/data/tenants.json";
import "../../assets/styles/Tenants.scss";

import { IoIosArrowBack } from "react-icons/io";
import { TbPhoneCall, TbMail } from "react-icons/tb";

export default function Tenants() {

  const [totalTenant, setTotalTenant] = useState(tenants);

  const totalTenants = totalTenant.length;

  return (
    <>
      <div className="container">
        <div className="tenantsContainer">
          <div className="total">
            <span className="totalTenant">Total Tenants: {totalTenants}</span>
          </div>
          <div className="titleSection">
            <div className="title">
              <h3>Tenants</h3>
            </div>
            <div className="filterSection">
              <button className="filter">
                <IoIosArrowBack className="icon" />
                Filter
              </button>
            </div>
          </div>

          {/* Tenants Table */}
          <div className="table-section">
            <table className="table tenantTable">
              <thead>
                <tr>
                  <th scope="col">Photo</th>
                  <th scope="col">Tenant Name</th>
                  <th scope="col">Tenant Type</th>
                  <th scope="col">Operation</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr className="tableRow" key={tenant.id}>
                    <td>
                      <img
                        className="tenantPhoto"
                        src={tenant.photo}
                        alt="Tenant"
                      />
                    </td>
                    <td>{tenant.name}</td>
                    <td>{tenant.type}</td>
                    <td className="tableIcon">
                      <TbPhoneCall className="icon" />
                      <TbMail className="icon" />
                    </td>
                    <td>
                      <button className="viewBtn">View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
