import React, { useEffect } from 'react'
import { getUserData } from '../api/fetchApi'
import { useState } from 'react'
import { getUserProfile } from '../api/fetchApi'
import EditUserProfile from './EditUserProfile'
import { Container, Row, Col, Card, Form, Button,Navbar, Nav, } from "react-bootstrap";

import './css/userProfile.css'
import { useNavigate } from 'react-router-dom'
function UserProfile() {


  const [details, setdetail] = useState({
    user: { id: "", username: "", password: "" }, phone: "", profile_pic: ""
  })

  const [user, setUser] = useState({
    id: "", username: ""
  })


  const header = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    'content-type': 'application/json'
  }

  useEffect(() => {
    getUserData(header).then((res) => {
      console.log(res.data);
      setUser(res.data)

    })
  }, [])

  useEffect(() => {
    getUserProfile(header).then((res) => {
      console.log(res.data);
      setdetail(res.data)

    })
  }, [])

  const navigate=useNavigate()

  return (
    <>
     <Navbar bg="white" expand="lg" className="shadow-sm py-3">
        <Container fluid className="d-flex align-items-center">

          {/* LEFT SIDE: Home Button */}
          <div className="flex-1 d-flex justify-content-start" style={{ flex: 1 }}>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate('/')}
            >
              Back
            </Button>
          </div>

          {/* CENTER: Title */}
          <div className="flex-1 d-flex justify-content-start" style={{ flex: 1 }}>
            <Navbar.Brand className="fw-bold">
              User Profile
            </Navbar.Brand>
          </div>



        </Container>
      </Navbar>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src={details.profile_pic || "/default-avatar.png"}
              alt="Profile"
              className="profile-image"
            />
            <h2></h2>
            <p className="email">{user.username}</p>
          </div>

          <div className="profile-body">
            {/* <div className="info-row">
              <span>{details.user.username}</span>
              <span></span>
            </div> */}

            <div className="info-row">
              <span>Username</span>
              <span>{details?.user.username}</span>
            </div>


            <div className="info-row">
              <span>Phone</span>
              <span>{details?.phone}</span>
            </div>



          </div>




          <div className="profile-footer">
            <EditUserProfile />
          </div>
        </div>
      </div>


    </>
  )
}

export default UserProfile