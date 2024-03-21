import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <>
      <div className="payment-confirmation">
        <div className="child-container">
          <div className="header-fail">
            <IoMdCloseCircle className='icon' />
            <span>Payment cancelled</span>
          </div>
          
          <div className="footer">
            <button onClick={() => navigate("/")}>RETURN TO DASHBOARD</button>
          </div>
        </div>
      </div>
    </>
  )
}
