import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { HiOutlineUpload } from "react-icons/hi";
import { MdOutlineCloudUpload } from "react-icons/md";
import "../../../assets/styles/Verification.scss";
import axios from "axios";

export default function Verification({ changePage }) {
  const [documentType, setDocumentType] = useState(null);
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleSelectChange = (event) => {
    setDocumentType(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('nidImage', file);

    try {
      const res = await axios.post('http://localhost:5000/documents', formData);
      console.log("Response: ", res);
      if (res.status === 200) {
        setExtractedText(res.data);
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <>
      <main className="container bg-white p-3 rounded">
        {/* Header */}
        <section className="d-flex align-items-center">
          <button
            className="bg-transparent border-0"
            onClick={() => changePage("profile")}
          >
            <IoArrowBackSharp />
          </button>
          <h5 className="mx-2 my-2">Verification</h5>
        </section>

        {/* Document Verification */}
        <section className="verification">
          <h4>Upload a proof of your identity</h4>
          <small>
            Please provide a valid government issues ID (NID, passport)
          </small>

          {/* Document Type */}
          <div className="document-type">
            <h6>Document Type</h6>
            <select
              class="form-select form-select-md mb-3"
              aria-label=".form-select-lg example" 
              onChange={handleSelectChange}
            >
              <option value ="" selected>Select a document type</option>
              <option value="nid">NID</option>
              <option value="passport">Passport</option>
            </select>
          </div>

          {/* Picture Box For NID */}
          {documentType === "nid" && (
            <div className="nid">
              <div className="nid-picture-box">
                <div>
                  <HiOutlineUpload />
                  <h6>Front side of your NID</h6>
                  <small>Supports: JPG, PNG</small>
                  <input type="file" onChange={handleFileChange} placeholder="Choose a File"/>
                </div>
                <div>
                  <HiOutlineUpload />
                  <h6>Back side of your NID</h6>
                  <small>Supports: JPG, PNG</small>
                  <input type="file" onChange={handleFileChange} placeholder="Choose a File"/>
                </div>
              </div>

              {/* upload button and extracted text */}
              <button onClick={handleUpload}>
                <MdOutlineCloudUpload style={{marginRight: "4px"}} />
                Submit
              </button>
                {extractedText && (
                  <div className="extracted-text">
                    <h4>Extracted Text:</h4>
                    <p>{extractedText}</p>
                  </div>
                )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
