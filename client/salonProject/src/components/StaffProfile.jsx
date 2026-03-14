import React, { useEffect, useState } from 'react'
import { getStaffProfile } from '../api/fetchApi'
import EditStaffProfile from './EditStaffProfile';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button,Navbar, Nav, } from "react-bootstrap";

function UserProfile() {

  const navigate=useNavigate()

  const [profile, setProfile] = useState({
    id: "",
    user: {
      username: "",
      email: ""
    },
    specialization: "",
    staff_phone: "",
    price: "",
    staff_profile: "",
    is_active: true

  });


  const header = {
    "Authorization": `token ${sessionStorage.getItem("token")}`,
    'Content-type': 'application/json'

  }


  useEffect(() => {
    getStaffProfile(header).then((res) => {
      console.log(res.data);
      setProfile(res.data)

    })
  }, [])

  console.log(profile);

  return (
    <>
     <Navbar bg="white" expand="lg" className="shadow-sm py-3">
        <Container fluid className="d-flex align-items-center">

          {/* LEFT SIDE: Home Button */}
          <div className="flex-1 d-flex justify-content-start" style={{ flex: 1 }}>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate('/staff/home')}
            >
              Back
            </Button>
          </div>

          {/* CENTER: Title */}
          <div className="flex-1 d-flex justify-content-start" style={{ flex: 1 }}>
            <Navbar.Brand className="fw-bold">
              Staff Profile
            </Navbar.Brand>
          </div>



        </Container>
      </Navbar>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="w-75 p-4 shadow rounded bg-white">

          {/* Profile Image */}
          <div className="text-center mb-4">
            <img
              src={
                profile.staff_profile
                  ? profile.staff_profile
                  : "/default-avatar.png"
              }
              alt="Profile"
              className="rounded-circle border"
              width="150"
              height="150"
            />
          </div>

          {/* FORM */}
          <form>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.user.username}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={profile.user.email}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.staff_phone}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.specialization}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Service Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.price}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  // value={"Active" }
                  value={profile.is_active ? "Active" : "Inactive"}
                  disabled
                />
              </div>

            </div>

            {/* BUTTON */}
            <div className="text-center mt-4">
       <EditStaffProfile/>
            </div>
          </form>

        </div>
      </div>


    </>
  )
}

export default UserProfile