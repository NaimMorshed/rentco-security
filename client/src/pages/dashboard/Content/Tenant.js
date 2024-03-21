import React from 'react';
import { FaWallet } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { GiMoneyStack, GiTwoCoins } from "react-icons/gi";
import { MdKeyboardArrowRight } from "react-icons/md";
import '../../../assets/styles/Content-Tenant.scss';


export default function Tenant() {
  return (
    <>
      <div className="container">
        <div className="content-tenant-container">
          <div className="content-tenant-heading">
            <h4 className='content-tenant-title'>Hi Cooper!</h4>
            <span className='content-tenant-sub-title'>Accounts Overview</span>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card">
                <div className="card-body tenant-card-body">
                  <div className='tenant-card-icon-div'><FaWallet className='tenant-card-icon' /></div>
                  <div className="tenant-card-title">
                    <TbCurrencyTaka className='taka-icon' />
                    <span className='tenant-card-amount'>22,500</span>
                    <h6 className='tenant-card-sub-title'>Monthly Rent</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body tenant-card-body">
                  <div className='tenant-card-icon-div'><GiMoneyStack className='tenant-card-icon' /></div>
                  <div className="tenant-card-title">
                    <TbCurrencyTaka className='taka-icon' />
                    <span className='tenant-card-amount'>5,000</span>
                    <h6 className='tenant-card-sub-title'>Balance Amount</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body tenant-card-body">
                  <div className='tenant-card-icon-div'><GiTwoCoins className='tenant-card-icon' /></div>
                  <div className="tenant-card-title">
                    <TbCurrencyTaka className='taka-icon' />
                    <span className='tenant-card-amount'>5,000</span>
                    <h6 className='tenant-card-sub-title'>Security Deposit</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Landowner Information */}
          <div className="content-landowner-info-container">
            <div className="landowner-info d-flex justify-content-between">
              <h4>Landowner Information</h4>
              <button className='view-profile-btn'>View Profile <MdKeyboardArrowRight className='view-profile-btn-icon' /></button>
            </div>
            <div className="landowner-info-card">
              <div className="info-right">
                <div className="info">
                  <span className='info-title'>Landowner Name:</span> <span>Hossain Shikder</span>
                </div>
                <div className="info">
                  <span className='info-title'>Tenant Since:</span> <span>22 Feb 2021</span>
                </div>
                <div className="info">
                  <span className='info-title'>Address:</span> <span>24/A, West Kazipara, Dhaka</span>
                </div>
                <div className="info">
                  <span className='info-title'>Unit No:</span> <span>201</span>
                </div>
                <div className="info">
                  <span className='info-title'>Apartment Type:</span> <span>Family</span>
                </div>
              </div>
              <div className="info-left">
                <div className="info">
                  <span className='info-title'>Bill Type:</span> <span>Postpaid</span>
                </div>
                <div className="info">
                  <span className='info-title'>Recent transaction:</span> <span>05 Sep 2023</span>
                </div>
                <div className="info">
                  <span className='info-title'>Total rent paid:</span> <span>1,20,500</span>
                </div>
                <div className="info">
                  <span className='info-title'>Avg. electricity bill (Monthly):</span> <span>1,517</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
