import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function Success() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="payment-confirmation">
        <div className="child-container">
          <div className="header-success">
            <FaCheckCircle className="icon" />
            <span>Payment successful</span>
          </div>
          <div className="body">
            <table>
              <tr>
                <td>Payment type</td>
                <td>Bkash</td>
              </tr>
              <tr>
                <td>Landowner</td>
                <td>Hasibul Islam</td>
              </tr>
              <tr>
                <td>Mobile</td>
                <td>+8801937933506</td>
              </tr>
              <tr>
                <td>Month</td>
                <td>July</td>
              </tr>
              <tr>
                <th>Amount paid</th>
                <th>20500.00</th>
              </tr>
              <tr>
                <td>Transaction id</td>
                <td>534231059g9dk1</td>
              </tr>
            </table>
          </div>
          <div className="footer">
            <button onClick={handlePrint}>PRINT</button>
            <button onClick={() => navigate("/")}>RETURN TO DASHBOARD</button>
          </div>
        </div>
      </div>
    </>
  );
}
