import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Fail() {
  const navigate = useNavigate();

  return (
    <>
      <div className="payment-confirmation">
        <div className="child-container">
          <div className="header-fail">
            <IoMdCloseCircle className='icon' />
            <span>Payment declined</span>
          </div>
          
          <div className="footer">
            <button onClick={() => navigate("/")}>RETURN TO DASHBOARD</button>
          </div>
        </div>
      </div>
    </>
  )
}
