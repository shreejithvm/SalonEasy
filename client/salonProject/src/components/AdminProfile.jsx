import React from "react";
import { Container, Row, Col, Card, Form, Button,Navbar, Nav, } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
function Profile() {

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
              onClick={() => navigate('/admin/dash')}
            >
              Back
            </Button>
          </div>

          {/* CENTER: Title */}
          <div className="text-center" style={{ flex: 2 }}>
            <Navbar.Brand className="fw-bold m-0 p-0">
              Total Staffs
            </Navbar.Brand>
          </div>



        </Container>
      </Navbar>

    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-4">
            <h3 className="text-center mb-4">Admin Profile</h3>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                Value="Shreejith"
                disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                 Value="shreejith@gmail.com"
                disabled/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                 Value="9876543210"
                 disabled
                />
              </Form.Group>

              {/* <div className="text-center">
                <Button variant="primary">Update Profile</Button>
              </div> */}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>

    </>
  );
}

export default Profile;
