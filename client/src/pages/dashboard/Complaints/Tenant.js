import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from "date-fns";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";

export default function Tenant() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [complaints, setComplaints] = useState(0);

  const [data, setData] = useState({
    _id: user._id,
    severity: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setData(previous => ({
      ...previous,
      [e.target.name]: e.target.value,
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/complain", data)
      .then(res => {
        alert("Complain submitted");
        setComplaints(prev => ([ ...prev, res ]));
      })
      .catch(err => console.log("Error: ", err.message));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/complain/${id}`)
      .then(response => alert("Deleted"))
      .then(error => alert("Error"))
  };

  useEffect(() => {
    const myComplains = async () => {
      const res = await axios.get("http://localhost:5000/complain");
      if (res) {
        setComplaints(res.data.filter(item => item.tenantId === user._id));
      } else {
        alert("Failed to fetch complaints");
      }
    };
    myComplains();
  }, [])

  return (
    <>
      {/* <BootstrapModal /> */}
      <main className="complaints container">
        <section>
          <div id="left">
            <h2>{complaints.length} My Complains</h2>
          </div>
          <div id="right">
            <div>
              <h2>3</h2>
              <span>Done</span>
            </div>
            <div />
            <div>
              <h2>2</h2>
              <span>In progress</span>
            </div>
          </div>
        </section>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Complain</th>
              <th scope="col">PostedOn</th>
              <th scope="col">Severity</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints && complaints.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.description}</td>
                  <td>{format(item.postingDate, 'dd MMM yyyy')}</td>
                  <td>{item.severity}</td>
                  <td
                    style={
                      item.status === "Done"
                        ? { color: "green" }
                        : { color: "orange" }
                    }
                  >
                    {item.status === "Done" ? (
                      <FaRegCheckCircle style={{ margin: "0px 2px 2px 0px" }} />
                    ) : (
                      <BiTimeFive style={{ margin: "0px 2px 2px 0px" }} />
                    )}
                    {item.status}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item._id)} className='border-0 rounded bg-transparent text-primary'>Mark as resolved</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      {/* Post Button */}
      <section className='my-3 pt-4'>
        <form 
          onSubmit={handleSubmit}
          className='d-flex flex-column justify-content-center align-items-center gap-2'
        >
          <select className="p-2 rounded" name="severity" value={data.severity} onChange={handleInputChange} required>
            <option value="">Select Severity</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <textarea 
            name="description" 
            className='rounded p-2'
            placeholder='Write your complain here' 
            cols="50" 
            rows="5" 
            value={data.description} 
            onChange={handleInputChange} 
            required>
          </textarea>
          <input 
            className='btn btn-primary' 
            type="submit" 
            value="Post your complain"
          />
        </form>
      </section>
    </>
  )
}
