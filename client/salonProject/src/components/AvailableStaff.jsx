import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { staffsAvail } from "../api/fetchApi";
import { useSearchParams } from "react-router-dom";
function AvailableStaff() {

  const [searchParams] = useSearchParams();
  const specialization= searchParams.get("specialization");
  const [staffs, setStaffs] = useState([]);

    const header = {
        "Authorization":`Token ${sessionStorage.getItem("token")}`,
        'Content-Type': 'application/json'
    }

const navigate=useNavigate()

  useEffect(() => {
    if (specialization) {
      staffsAvail(specialization,header).then(res => 
        setStaffs(res.data))
        .catch(err => console.log(err));
  
        
    }
  }, [specialization]);



console.log(staffs);



  return (
    <>

    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container fluid className="d-flex align-items-center">
        
        {/* LEFT SIDE: Home Button */}
        <div className="flex-1 d-flex justify-content-start" style={{ flex: 1 }}>
          <Button 
            variant="outline-dark" 
            size="sm" 
            onClick={() => window.location.href = '/'}
          >
            Home
          </Button>
        </div>

        {/* CENTER: Title */}
        <div className="text-center" style={{ flex: 2 }}>
          <Navbar.Brand className="fw-bold m-0 p-0">
            Choose Available Staff
          </Navbar.Brand>
        </div>

        {/* RIGHT SIDE: Back Button */}
        <div className="flex-1 d-flex justify-content-end" style={{ flex: 1 }}>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => navigate('/')}
          >
            Back
          </Button>
        </div>

      </Container>
    </Navbar>

       <Row className="mt-4">
  {staffs.length > 0 ? (
    staffs.map((res) => (
      <Col key={res.id} sm={6} md={4} lg={3} className="mb-4">
        <Card className="h-100 shadow-sm border-0">

          {/* Staff Image */}
          <Card.Img
            variant="top"
            src={res.staff_profile || "/default-image.jpg"}
            alt={res.user.username}
            style={{
              height: "200px",
              objectFit: "cover"
            }}
          />

          <Card.Body className="d-flex flex-column">

            {/* Name */}
            <Card.Title className="fw-bold text-center">
             {res.user.username}
            </Card.Title>

            {/* Specialization */}
            <Card.Text className="text-center text-muted mb-1">
              {res.specialization}
            </Card.Text>

            {/* Phone */}
            <Card.Text className="text-center mb-1">
              📞 {res.staff_phone}
            </Card.Text>

            {/* Price */}
            <Card.Text className="text-center fw-semibold text-success mb-3">
              ₹ {res.price}
            </Card.Text>

            {/* Action */}
<button
  className="btn btn-dark"
  onClick={() =>
    navigate(
      `/booking?staff=${res.id}&service=${res.specialization}&price=${res.price}`
    )
  }
>
  Book Appointment
</button>


          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <Col className="text-center">
      <h5 className="text-muted">No Staff Available</h5>
    </Col>
  )}
</Row>
    
    
    </>
    

  )
}

export default AvailableStaff