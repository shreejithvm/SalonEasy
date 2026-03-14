import React, { useEffect, useState } from 'react'
import { getallStaffs } from '../api/fetchApi'
import { Row, Col, Container, Card, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { staffApprove } from '../api/fetchApi';
function AdminstaffsList() {

  const navigate = useNavigate()
  const [staffs, setstafs] = useState([])

  const header = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    'content-type': 'application/json'
  }

  useEffect(() => {
    getallStaffs(header).then((res) => {
      console.log(res.data);
      setstafs(res.data)

    })
  }, [])

  const handleStatusChange = async (id, status) => {

  const data = {
    is_active: status === "true"
  }

  await staffApprove(id, data, header)

  // update UI without refresh
  setstafs(prev =>
    prev.map(staff =>
      staff.id === id ? { ...staff, is_active: data.is_active } : staff
    )
  )
}
  return (
    <>

      <Navbar bg="white" expand="lg" className="shadow-sm py-3">
        <Container fluid className="d-flex align-items-center">

          {/* LEFT SIDE: Home Button */}
          <div className="flex-1 d-flex justify-content-start" >
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
                  
          <div className="input-group">
            <label>Status</label>
            <select className='btn btn-success'

              value={res.is_active ? "true":"false"}
              onChange={(e)=>{handleStatusChange(res.id, e.target.value)}}
              required
            >
              <option value="true">Active</option>
              <option value="false">Deactive</option>
            </select>
          </div>

                


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

export default AdminstaffsList