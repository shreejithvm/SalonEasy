import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Card, Navbar, Nav, Button, Form } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';
import { getbookDetail } from '../api/fetchApi';
import { useNavigate } from 'react-router-dom';
import { createPayment } from '../api/fetchApi';
import { toast } from "react-toastify";
import { verifyPayment } from '../api/fetchApi';

function Payment() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const bookingId = searchParams.get("booking");

    console.log(bookingId)

    const [booking, setbooked] = useState(null)

    const header = {
        "Authorization": `Token ${sessionStorage.getItem("token")}`,
        'content-type': 'application/json'
    }

    useEffect(() => {
        getbookDetail(bookingId, header).then((res) => {
            setbooked(res.data)
            console.log(res.data);


        })
    }, [])

    const handlePayment = () => {

        createPayment(bookingId, header)
            .then(res => {
                openRazorpay(res.data);
            })
            .catch(() => {
                toast.error("Payment initialization failed");
            });
    };


    const openRazorpay = (data) => {

        const options = {
            key: data.razorpay_key,
            amount: data.amount * 100,
            currency: "INR",
            order_id: data.order_id,
            name: "Salon Booking",
            description: "Appointment Payment",

            handler: function (response) {
                verifyPayment(response, header)
                    .then(() => {
                        toast.success("Payment Successful!");
                        navigate("/");   // optional redirect
                    })
                    .catch(() => {
                        toast.error("Payment verification failed");
                    });
            },
            theme: {
                color: "#000000"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };




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
                            Payment
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


            <Container className="mt-4">
                <Card className="p-4 shadow-sm">
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>User</Form.Label>
                            <Form.Control value={booking?.user?.username} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Service</Form.Label>
                            <Form.Control value={booking?.service} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Staff</Form.Label>
                            <Form.Control value={booking?.staff?.user.username} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control value={booking?.booking_date || ""} disabled />
                        </Form.Group>



                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control value={booking?.booking_time || ""} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label  >Price</Form.Label>
                            <Form.Control value={`₹ ${booking?.price}`} disabled />
                        </Form.Group>

                        <Button className="w-25 d-block mx-auto" variant="success" onClick={handlePayment}>
                            Pay
                        </Button>

                    </Form>
                </Card>
            </Container>


        </>
    )
}

export default Payment