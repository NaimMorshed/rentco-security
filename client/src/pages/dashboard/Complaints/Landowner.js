import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { format } from "date-fns";

export default function Landowner() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [complaints, setComplaints] = useState(0);

  useEffect(() => {
    const myComplains = async () => {
      const res = await axios.get("http://localhost:5000/complain");
      if (res) {
        setComplaints(res.data.filter(item => item.landownerId === user._id));
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
            <h2>{complaints.length} Total</h2>
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
              <th scope="col">Tenant</th>
              <th scope="col">Unit No</th>
              <th scope="col">PostedOn</th>
              <th scope="col">Severity</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints && complaints.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.description}</td>
                  <td>{item.fullName}</td>
                  <td>{item.unitNumber}</td>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}
