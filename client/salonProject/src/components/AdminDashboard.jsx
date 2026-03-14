import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getallorders } from "../api/fetchApi";
function StaffHome() {
  const navigate = useNavigate();
  const header = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    'content-type': 'application/json'
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // or staffToken
    navigate("/login");
  };

  const [orders, setorders] = useState([])

  useEffect(() => {
    getallorders(header).then(res => {
      console.log(res.data);
      setorders(res.data)

    })
  }, [])


  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div
        className="bg-dark text-white p-4"
        style={{ width: "240px" }}
      >
        <h4 className="text-center mb-4">Admin Panel</h4>

        <ul className="nav nav-pills flex-column gap-2">
          <li className="nav-item">
            <button className="btn btn-light w-100 text-start active">
              📅 Appointments
            </button>
          </li>
          <li className="nav-item">
            <Link to={"/staffslist"}>
              <button className="btn  btn-light w-100 text-start active" >
                🚨Staff
              </button>
            </Link>
          </li>
         <Link to={"/customers/list"}>
          <li className="nav-item">
            <button className="btn  btn-light w-100 text-start active">
              👥Users
            </button>
          </li>
         </Link>
         
          <li className="nav-item">
            <button className="btn  btn-light w-100 text-start active">
              ⭐ Reviews
            </button>
          </li>


          <li className="nav-item">
            <button
              className="btn  btn-light w-100 text-start"
              onClick={() => navigate("/adprofile")}
            >
              👤 Profile
            </button>
          </li>

          <li className="nav-item mt-3">
            <button
              className="btn btn-outline-danger w-100"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 p-5 bg-light">
        <div className="border shadow p-4 bg-danger rounded">
          <h3 className="mb-4">Appointments</h3>

          <table className="table table-bordered table-striped bg-white">
            <thead className="table-secondary">
              <tr>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Staff Name</th>
                <th>Service</th>
                <th>price</th>
                <th>Date</th>
                <th>Time</th>
                {/* <th>Delete Order</th> */}
              </tr>
            </thead>

            <tbody>
              {
                orders.length > 0 ?
                  orders.map((res) => (
                    <tr key={res.id}>
                      <td>{res.user.username}</td>
                      <td>{res.user.email}</td>
                      <td>{res.staff.user.username}</td>
                      <td>{res.staff.specialization}</td>
                      <td>{res.staff.price}</td>
                      <td>{res.booking_date}</td>
                      <td>{res.booking_time}</td>
                      {/* <td>
                        <i className="fa-solid fa-trash fa-xl" style={{ color: '#fd0808ff' }} ></i>
                      </td> */}
                    </tr>
                  ))
                  : <b>No Orders</b>




              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default StaffHome;
