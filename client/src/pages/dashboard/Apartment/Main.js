import { useEffect, useState } from "react";
import axios from "axios";
import "../../../assets/styles/Apartment.scss";
import { TbCurrencyTaka } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import apartImg from "../../../assets/images/apartment.jpg";
import Loader from "../../../components/loader/Loader";

export default function Main({ changePage }) {
  const [data, setApartment] = useState(null);
  const [bedcount, setBedCount] = useState(1);
  const [bathcount, setBathCount] = useState(1);
  const [loader, setLoader] = useState(false);

  const handleIncrement = (name) => {
    if (name === "bedroom") {
      setBedCount(bedcount + 1);
    }
    if (name === "bathroom") {
      setBathCount(bathcount + 1);
    }
  };

  const handleDecrement = (name) => {
    if (bedcount > 1) {
      if (name === "bedroom") {
        setBedCount(bedcount - 1);
      }
    }
    if (bathcount > 1) {
      if (name === "bathroom") {
        setBathCount(bathcount - 1);
      }
    }
  };

  useEffect(() => {
    setLoader(true);
    const getApartments = async () => {
      const response = await axios.get("http://localhost:5000/apartments");
      if (response.status === 200) {
        const filterData = response.data.filter(item => item.rented === false);
        setApartment(filterData);
      }
    }
    getApartments();
    setLoader(false);
  }, [])

  return (
    <>
      <div className="container">
        <div className="apartmentContainer">
          {/* ********************** */}
          {/* Search Section */}
          <div className="searchSection">
            <div className="title">
              <span className="titleText">Search Properties To Rent</span>
            </div>
            <div className="searchBar">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search Properties"
              />
              <button className="searchBtn">Search</button>
            </div>
          </div>

          {/* ********************** */}
          {/* Filter Area */}
          <div className="filterArea">
            <div className="location">
              <span>Location</span> <br />
              <select name="location" id="location">
                <option value="chooseArea">Choose Area</option>
              </select>
            </div>
            <div className="priceArea">
              <span>Price</span> <br />
              <select name="price" id="price">
                <option value="15000-20000">
                  <TbCurrencyTaka />
                  15000-20000
                </option>
              </select>
            </div>
            <div className="areaArea">
              <span>Area</span> <br />
              <select name="area" id="area">
                <option value="1,400-1,700sqft">
                  <TbCurrencyTaka />
                  1,400-1,700sqft
                </option>
              </select>
            </div>
            <div className="bed-bathArea">
              <div className="bed-bath">
                <span>Bedroom</span> <br />
                <button
                  onClick={() => handleDecrement("bedroom")}
                  className="deBtn"
                >
                  -
                </button>
                <input
                  className="bed-bath-input"
                  type="text"
                  name="bedroom"
                  id="bedroom"
                  Value={bedcount}
                />
                <button
                  onClick={() => handleIncrement("bedroom")}
                  className="inBtn"
                >
                  +
                </button>
              </div>
              <div className="bed-bath">
                <span>Bathroom</span> <br />
                <button
                  onClick={() => handleDecrement("bathroom")}
                  className="deBtn"
                >
                  -
                </button>
                <input
                  className="bed-bath-input"
                  type="text"
                  name="bathroom"
                  id="bathroom"
                  Value={bathcount}
                />
                <button
                  onClick={() => handleIncrement("bathroom")}
                  className="inBtn"
                >
                  +
                </button>
              </div>
            </div>
            <div className="additional">
              <span>Additional Conveniences</span> <br />
              <select name="additional" id="additional">
                <option value="parking">Parking Slot</option>
                <option value="convention">Convention Hall</option>
              </select>
            </div>
          </div>

          {/* ********************** */}
          {/* Apartment Card Area */}
          <div className="apartmentCardArea">
            {data && data.map((item, index) => {
              return (
                <div key={index} className="apartCard" onClick={() => changePage("view", item)}>
                  <div className="apartImg">
                    <img src={item.images? item.image: apartImg} alt={"item.name"} />
                  </div>
                  <div className="apartCardBody">
                    <div className="apartPrice">
                      <div className="apartPriceTitle">
                        <span className="price">
                          <TbCurrencyTaka className="takaIcon" />
                          {item.rent}
                        </span>
                        <span className="spanText">/month</span>
                      </div>
                      <div className="apartHeartIcon">
                        <AiOutlineHeart className="heartIcon" />
                      </div>
                    </div>
                    <div className="apartTitle">
                      <h4>{item.title}</h4>
                    </div>
                    <div className="apartAddress">
                      <span className="spanAddress">{item.address}</span>
                    </div>
                  </div>
                  <div className="apartFooter">
                    <div className="bedroom">
                      <BiBed className="icon" />
                      <span>{item.bedRooms}Bedroom</span>
                    </div>
                    <div className="bathroom">
                      <BiBath className="icon" />
                      <span>{item.bathRooms}Bathroom</span>
                    </div>
                    <div className="area">
                      <BiArea className="icon" />
                      <span>{item.area}sqft</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LOADER */}
      {loader && <Loader />}
    </>
  );
}
