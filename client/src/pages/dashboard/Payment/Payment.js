import React, { useEffect, useState } from 'react';
import { FaFlag } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { paymentData } from '../../../assets/data/paymentData';
import { IoMdArrowDropdown } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import "../../../assets/styles/Payment.scss";
import axios from 'axios';


export default function Payment() {
  const [currentMonthYear, setCurrentMonthYear] = useState('');
  const [previousMonthYear, setPreviousMonthYear] = useState('');
  const [data, setData] = useState({ amount: 34000 });
  const [nextMonthYear, setNextMonthYear] = useState('');
  const [numberValue, setNumberValue] = useState(0);

  useEffect(() => {
    const updateMonthYear = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      // Current month and year
      const currentMonthString = `${monthNames[currentMonth]} ${currentYear}`;
      setCurrentMonthYear(currentMonthString);

      // Previous month and year
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const previousMonthString = `${monthNames[previousMonth]} ${previousYear}`;
      setPreviousMonthYear(previousMonthString);

      // Next month and year
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const nextMonthString = `${monthNames[nextMonth]} ${nextYear}`;
      setNextMonthYear(nextMonthString);
    };

    updateMonthYear();

    // Set up an interval to update every second (adjust as needed)
    const intervalId = setInterval(updateMonthYear, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handlePayment = async () => {
    try {
      axios
        .post("http://localhost:5000/payment", data)
        .then((response) => window.location.replace(response.data.url))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container payment-parent">
      <div className="payment-title">
        <h4>PENDING PAYMENTS</h4>
        <h6 style={{ opacity: .75 }}><FaFlag /> Raise an issue</h6>
      </div>
      {/*  Previous Month */}
      <div className="payment-month">
        <div className="month-title">
          <h5>{previousMonthYear}</h5>
        </div>
        <div className="calculation">
          <p>Rent: 15,500</p>
          <p>Electricity: 1,575</p>
          <p>Penalty: 1,000</p>
          <h6>Total: 17,575</h6>
        </div>
        <div className="payment-total">
          <h5 style={{ opacity: .75}}>Total</h5>
          <h5><TbCurrencyTaka /> 34,150</h5>
          <button onClick={handlePayment} className="payment-button">PAY NOW</button>
        </div>
      </div>

      {/* Current Month */}
      <div className="payment-month">
        <div className="month-title">
          <h5>{currentMonthYear}</h5>
        </div>
        <div className="calculation">
          <p>Rent: 15,500</p>
          <p>Electricity: 1,575</p>
          <p>Penalty: 1,000</p>
          <h6>Total: 17,575</h6>
        </div>
        <div className="payment-total">
          <h5 style={{ opacity: .75 }}>Total</h5>
          <h5><TbCurrencyTaka /> 34,150</h5>
          <button className="payment-button">PAY NOW</button>
        </div>
      </div>

      <div className="payment-list-section">
        <h4 className='payment-list-title'>SUCCESSFUL PAYMENTS</h4>
        <ul>
          {paymentData.map((data, index) => (
            <li className='payment-list' key={index}>
              <details>
                <summary className="payment-date">
                  {data.date}
                  <div className='trx-id'>Trx ID: {data['trx-id']}</div>
                  <div><TbCurrencyTaka />{data.rent + data.electricity + data.penalty} <IoMdArrowDropdown /></div>
                </summary>
                <div className="inner-list">
                  <div>
                    <button className='download-button'><FiDownload /> Download Receipt</button>
                  </div>
                  <div className='inner-details'>
                    <h6>Rent: {data.rent}</h6>
                    <h6>Electricity: {data.electricity}</h6>
                    <h6>Penalty: {data.penalty}</h6>
                    <h5>Total: {data.rent + data.electricity + data.penalty}</h5>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div >
  )
}
