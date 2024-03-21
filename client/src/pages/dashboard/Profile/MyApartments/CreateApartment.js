import React, { useContext, useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { storage } from '../../../../firebase/firebase.config';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../../../App";
import axios from "axios";

import "../../../../assets/styles/CreateApartment.scss";

export default function CreateApartment({ changePage }) {

  const [selectedImages, setSelectedImages] = useState([]);
  const [authentication, setAuthentication] = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [formData, setFormData] = useState({
    landownerId: '',
    propertyId: '',
    description: '',
    unitNumber: 0,
    floor: 0,
    rent: 0,
    bedRooms: 0,
    bathRooms: 0,
    drawingRooms: 0,
    diningSpace: 0,
    area: 0,
    parking: 0,
    wifi: false,
    kitchen: 0,
    furnished: false,
    type: '',
    balcony: 0,
    facing: '',
    status: '',
    gasType: '',
    images: imgUrl,
  });

  useEffect(() => {

    // Get user_id from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData(previous => ({
        ...previous,
        landownerId: user._id
      }));
    } else {
      setAuthentication(false);
    }

    // Get property_id
    const getProperty = async () => {
      const response = await axios.get(`http://localhost:5000/property/landownerId/${user._id}`);
      if (response.status === 200) {
        setFormData(previous => ({
          ...previous,
          propertyId: response.data._id
        }));
      } else {
        alert("Please create property first from: profile section > edit property");
        changePage("profile");
      }
    };
    getProperty();

  }, []);

  // handle input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Prevent negative values for the "unitNumber" field
    const sanitizedValue = type === 'number' ? Math.max(0, parseFloat(value)) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : sanitizedValue,
    }));
  };

  // handle image function to show the selected images
  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files);
    setImage(e.target.files[0]);

    // Keep only the first 4 images
    const firstFourImages = imagesArray.slice(0, 4);

    setSelectedImages(firstFourImages);

    // Display image preview
    const preview = document.getElementById('image-preview');
    preview.innerHTML = ''; // Clear previous previews and count

    firstFourImages.forEach((image, index) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = `Preview ${index}`;
        img.className = 'preview-image';
        preview.appendChild(img);
      };

      reader.readAsDataURL(image);
    });

    // Show count if there are more than 4 images
    if (imagesArray.length > 4) {
      const countElement = document.createElement('span');
      countElement.textContent = `+${imagesArray.length - 4} more`;
      countElement.className = 'image-count';
      preview.appendChild(countElement);
    }
  };

  const databaseInsert = async () => {
    try {
      await axios.post(`http://localhost:5000/apartments`, formData);
      alert("Success");
      changePage("myApartments");
    } catch (error) {
      alert("Error");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgRef = ref(storage, `apartments/${uuidv4()}`)
    const snapshot = await uploadBytes(imgRef, image);
    const url = await getDownloadURL(snapshot.ref);
    setImgUrl(url);
    databaseInsert();
  };

  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Header */}
        <section>
          <div className="d-flex align-items-center">
            <button className="bg-transparent border-0" onClick={() => changePage("myApartments")}>
              <IoArrowBackSharp />
            </button>
            <h5 className="mx-2 my-2">Create New Apartment</h5>
          </div>
        </section>

        {/* Main Content */}
        <section className="create-apart-form">
          {/* YOUR CODE GOES HERE */}

          {/* /==============***=============/ */}
          {/* Form Starts For Here */}
          {/* /==============***=============/ */}

          <form onSubmit={handleSubmit}>
            <div className="apart-form">
              <div className="left-part">

                <div>
                  <label>
                    Unit Number:
                    <input type="number" name="unitNumber" value={formData.unitNumber} onChange={handleInputChange} />
                  </label>
                </div>

                <div>
                  <label>
                    Floor:
                    <input type="number" name="floor" value={formData.floor} onChange={handleInputChange} />
                  </label>
                </div>

                <div>
                  <label>
                    Rent:
                    <input type="number" name="rent" value={formData.rent} onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Bedrooms:
                    <input type="number" name="bedRooms" value={formData.bedRooms} onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Bathrooms:
                    <input type="number" name="bathRooms" value={formData.bathRooms} onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Drawing Rooms:
                    <input type="number" name="drawingRooms" value={formData.drawingRooms} onChange={handleInputChange} />
                  </label>
                </div>

                <div>
                  <label>
                    Dining Space:
                    <input type="number" name="diningSpace" value={formData.diningSpace} onChange={handleInputChange} />
                  </label>
                </div>

                <div>
                  <label>
                    Kitchen:
                    <input type="number" name="kitchen" value={formData.kitchen} onChange={handleInputChange} />
                  </label>
                </div>

                <div>
                  <label>
                    Balcony:
                    <input type="number" name="balcony" value={formData.balcony} onChange={handleInputChange} />
                  </label>
                </div>

                <div>
                  <label>
                    Area:
                    <input type="number" name="area" value={formData.area} onChange={handleInputChange} />
                  </label>
                </div>

                <div>
                  <label>
                    Parking:
                    <input type="number" name="parking" value={formData.parking} onChange={handleInputChange} />
                  </label>
                </div>

              </div>

              {/* =============***=========== */}
              {/* Right Section */}
              {/* =============***=========== */}

              <div className="right-part">

                <div>
                  <label>
                    Type:
                    <div className="input-custom">
                      <select name="type" value={formData.type} onChange={handleInputChange}>
                        <option value="">Select Type</option>
                        <option value="Family">Family</option>
                        <option value="Bachelor">Bachelor</option>
                      </select>
                    </div>
                  </label>
                </div>

                <div>
                  <label>
                    Facing:
                    <div className="input-custom">
                      <select name="facing" value={formData.facing} onChange={handleInputChange}>
                        <option value="">Select Facing</option>
                        <option value="North">North</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="South">South</option>
                      </select>
                    </div>
                  </label>
                </div>

                <div>
                  <label>
                    Status:
                    <input type="text" name="status" value={formData.status} onChange={handleInputChange} />
                  </label>
                </div>

                <div>
                  <label>
                    Gas Type:
                    <div className="input-custom">
                      <select name="gasType" value={formData.gasType} onChange={handleInputChange}>
                        <option value="">Select Gas Type</option>
                        <option value="Natural Gas">Natural Gas</option>
                        <option value="Cylinder">Cylinder</option>
                      </select>
                    </div>
                  </label>
                </div>

                <div className="text-area-field">
                  <label>
                    Description:
                  </label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} ></textarea>
                </div>

                <div style={{ margin: '20px 0px' }}>
                  <input type="checkbox" name="wifi" checked={formData.wifi} onChange={handleInputChange} />
                  <span>Wifi</span>
                </div>

                <div style={{ margin: '20px 0px' }}>
                  <input type="checkbox" name="furnished" checked={formData.furnished} onChange={handleInputChange} /> 
                  <span>Furnished</span>
                </div>

                <div>
                  <label>
                    <input type="file" multiple name="images" value={formData.images} onChange={handleImageChange} />
                  </label>
                </div>

                <div className="image-preview">
                  {/* Display image previews here */}
                  {selectedImages.map((image, index) => (
                    <img key={index} style={{width:"50px"}} src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="preview-image" />
                  ))}
                </div>
                {/* <progress value={progress} max="100" /> */}

                <button type="submit">Submit</button>

              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
