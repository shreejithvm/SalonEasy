import React, { useEffect, useState } from 'react'
import { myBooking } from '../api/fetchApi'
import { Row, Col, Container, Card, Navbar, Nav, Button, Form } from "react-bootstrap";
import './css/mybooking.css'
import { useNavigate } from 'react-router-dom';
import { CancelOrder } from '../api/fetchApi';
import { toast } from 'react-toastify';
function Bookings() {

const[bookings,setbooking]=useState([])

const navigate=useNavigate()
    const header = {
        "Authorization": `Token ${sessionStorage.getItem("token")}`,
        'content-type': 'application/json'
    }

useEffect(()=>{
  myBooking(header).then(res=>{
    console.log(res.data);
    setbooking(res.data)
    
  })
},[])

console.log(header);

const deleteMyroder=((id)=>{
  CancelOrder(id,header).then(res=>{
    console.log(res.data);
    toast("Order Cancelled ✅")

    
  })
    
  
})

  return (
    <>
       <Navbar bg="white" expand="lg" className="shadow-sm py-3">
                <Container fluid className="d-flex align-items-center">

                    {/* LEFT SIDE: Home Button */}
                    <div className="flex-1 d-flex justify-content-start" style={{ flex: 1 }}>
                        <Button
                            variant="outline-dark"
                            size="sm"
                            onClick={() => navigate('/')}
                        >
                            Home
                        </Button>
                    </div>

                    {/* CENTER: Title */}
                    <div className="text-center" style={{ flex: 2 }}>
                        <Navbar.Brand className="fw-bold m-0 p-0">
                            MyBookings
                        </Navbar.Brand>
                    </div>

                    {/* RIGHT SIDE: Back Button */}
                    <div className="flex-1 d-flex justify-content-end" style={{ flex: 1 }}>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </Button>
                    </div>

                </Container>
            </Navbar>

            <Row className="g-4">
  {bookings.length > 0 ? (
    bookings.map(order => (
      <Col key={order.id} xs={12} sm={6} lg={4}>
        <Card className="h-100 shadow border-0 order-card">
          <Card.Body className="d-flex flex-column">

            {/* Service Title */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <Card.Title className="fw-bold fs-5">
                {order.service}
              </Card.Title>
              <span className="badge bg-success px-3 py-2">
                Paid
              </span>
            </div>

            {/* Order Details */}
            <Card.Text className="text-muted small mb-3">
              <strong>Staff:</strong> {order.staff.user.username} <br />
              <strong>Date:</strong> {order.booking_date} <br />
              <strong>Time:</strong> {order.booking_time}<br /><br />
              <button className='btn btn-danger'onClick={()=>{deleteMyroder(order.id)}}>Cancel Order</button>
            </Card.Text>

            {/* Price Section */}
            <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Total</span>
              <span className="fw-bold text-primary fs-5">
                ₹{order.price}
              </span>
            </div>

          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <Col>
      <div className="text-center py-5">
        <h5 className="text-muted">No Orders Yet</h5>
        <p className="text-secondary">Once you book a service, it will appear here.</p>
      </div>
    </Col>
  )}
</Row>

 

    </>
  )
}

export default Bookings