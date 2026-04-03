import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, Navbar, Nav, Button, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getslot, createBooking } from "../api/fetchApi";
import { toast } from "react-toastify";
import { getUserData } from "../api/fetchApi";
import { getStaffProfileByID } from "../api/fetchApi";
function Booking() {

  const [searchParams] = useSearchParams();

  const staffId = searchParams.get("staff");
  const service = searchParams.get("service");
  const price = searchParams.get("price");


  const [StaffName, setStaffName] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  // const loggedUser = JSON.parse(sessionStorage.getItem("user")); // adjust if stored differently
  const staffName = searchParams.get("staff") || "Selected Staff";


  console.log(staffName);
  // console.log(loggedUser)

 const navigate=useNavigate(

 )
  const [user, setUser] = useState({
    id: "", username: ""
  })


  const header = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    'content-type': 'application/json'
  }

  useEffect(() => {
    if (staffId) {
      getStaffProfileByID(staffId, header)
        .then(res => {
          setStaffName(res.data.user.username);
          console.log(`staff Name:${res.data.user.username}`);

        })
        .catch(() => {
          setStaffName("Unknown Staff");
        });
    }
  }, [staffId]);


  useEffect(() => {
    getUserData(header).then((res) => {
      console.log(res.data);
      setUser(res.data)

    })
  }, [])




  const ALL_SLOTS = [
    "10:00", "11:00", "12:00",
    "14:00", "15:00", "16:00", "17:00"
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];


  // 🔹 Fetch booked slots
  useEffect(() => {
    if (staffId && date) {
      getslot(staffId, date, header)
        .then(res => {
const booked = res.data.map(t => t.slice(0, 5)); // "10:00:00" → "10:00"

const free = ALL_SLOTS.filter(
  slot => !booked.includes(slot)
);

setAvailableSlots(free);

          setAvailableSlots(free);
        })
        .catch(() => toast.error("Failed to load slots"));
    }
  }, [staffId, date]);
  

  // 🔹 Submit booking
  const handleSubmit = () => {
    if (!date || !time) {
      toast.warning("Please select date and time");
      return;
    }

    createBooking({
      staff_id: staffId,
      service,
      price,
      booking_date: date,
      booking_time: time
    }, header)
      .then( res => {
        toast.success("Make payment");
      
        const bookingId = res.data.id;
      navigate(`/payment?booking=${bookingId}`);
      })
      .catch(err => {
        console.log(err.response.data);

        const msg =
          err.response.data.booking_time?.[0] ||
          err.response.data.non_field_errors?.[0] ||
          "This slot is already booked";

        toast.error(msg);
      });

  }
  console.log(availableSlots);
console.log(staffId);

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm py-3">
        <Container fluid>
          <Navbar.Brand className="fw-bold mx-auto">
            Select Slot
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Card className="p-4 shadow-sm">
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Control value={user.username} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Service</Form.Label>
              <Form.Control value={service} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Staff</Form.Label>
              <Form.Control value={StaffName} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control value={`₹ ${price}`} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                min={minDate}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>



            <Form.Group className="mb-4">
              <Form.Select
                disabled={!date}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">Select Time</option>
                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button className="w-100" variant="danger" onClick={handleSubmit}>
              Confirm Booking
            </Button>

          </Form>
        </Card>
      </Container>
    </>
  );
}

export default Booking;
