import React, { useState } from 'react';
import '../../assets/styles/Statement.scss';
import YearPicker from '../../components/calender/YearPicker';
import { CiSearch } from "react-icons/ci";
import MonthPicker from '../../components/calender/MonthPicker';
import { statementData } from '../../assets/data/statementData';
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Statement() {

  const [details, setDetails] = useState(false);

  const handleDateChange = (selectedDate) => {
    console.log('Selected Date:', selectedDate);
    // Handle the selected date as needed
  };


  return (
    <>
      <div className="container">
        <div className="statement-container">
          <div className="statement-title">
            <h4>Filter statements by:</h4>
            <div className="search-statement">
              <CiSearch className='search-icon' /><input className='search-statement-field' type="search" name="search-statement" id="search-statement" placeholder='Search' />
            </div>
          </div>
          {/* Filter Area */}
          <div className="filter-area">
            <div className="view-all-fld">
              <input className='view-all-btn' type="button" value="View All" />
            </div>
            <div className="category-fld">
              <h6>Category</h6>
              <select className='category-btn' name="category" id="category">
                <option value="Tenant">Tenant</option>
              </select>
            </div>
            <div className='year-fld'>
              <h6>Year</h6>
              <YearPicker onChange={handleDateChange} />
            </div>
            <div className='month-fld'>
              <h6>Month</h6>
              <MonthPicker onChange={handleDateChange} />
            </div>
            <div className='clear-fld'>
              <input className='clear-btn' type="button" value="Clear" />
            </div>
          </div>

          {/* Statements based on months */}
          <div className="monthly-statement">
            <ul>
              {
                statementData.map((data, index) => (
                  <li className='statement-list' key={index}>
                    <details>
                      <summary className='statement-month'>
                        <h4>{data.month}</h4>
                        <div className='toggle-fld'>
                          <div>
                            <span style={{ opacity: '0.75' }}>Expand Details</span><IoMdArrowDropdown />
                          </div>
                        </div>
                      </summary>

                      <div className="inner-list">
                        <table>
                          <tr>
                            <th>Tenant</th>
                            <th>Payment Type</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Action</th>
                          </tr>
                          <tbody>
                            {data.statements.map((innerData, index) => (
                              <tr key={index}>
                                <td>{innerData.name}</td>
                                <td>{innerData.paymentType}</td>
                                <td>{innerData.date}</td>
                                <td>{innerData.amount}</td>
                                <td><Link to="/" className='details-btn'>Click for details</Link></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>
                    </details>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
