import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Home() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

const services = [
    {
      title: "Facial Treatment",
      specialization: "SKIN",
      img: "https://i.pinimg.com/736x/f5/6c/09/f56c09aaedf10003bf9182a7b046e889.jpg",
      desc: "Rejuvenate your skin with expert facial care."
    },
    {
      title: "Hair Styling",
      specialization: "HAIR",
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df",
      desc: "Trendy haircuts & professional styling."
    },
    {
      title: "Nail Care",
      specialization: "NAILS",
      img: "https://i.pinimg.com/736x/38/3b/bf/383bbf965ba22139ecf80dc4698a9a57.jpg",
      desc: "Perfect nails with premium manicure services."
    }
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">
           <i className="fa-solid fa-scissors fa-beat-fade"></i> Salon Ease 
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#reviews">Reviews</a></li>
              <li className="nav-item"><a className="nav-link" href="#gallery">Gallery</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => navigate(isLoggedIn ? "bookings" : "/login")}
                >
                  👤 Bookings
                </button>
              </li>

              {/* PROFILE */}
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => navigate(isLoggedIn ? "user/profile" : "/login")}
                >
                  👤 Profile
                </button>
              </li>
              <li  className="nav-item ms-3">
  {isLoggedIn && (
    <Button className="btn btn-outline-danger btn-sm"  onClick={handleLogout}>
      Logout
    </Button>
  )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HOME / SLIDER */}
      <section id="home" className="mt-5 pt-4">
        <div
          id="salonCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">
            {[
              "https://i.pinimg.com/1200x/40/02/18/400218b38c97372bbd361f4a732467e7.jpg",
              "https://i.pinimg.com/1200x/12/3f/d3/123fd32d97e07d2147984f76fca3486a.jpg",
              "https://i.pinimg.com/1200x/ed/e6/bc/ede6bc063114d4c57cc6efab6444a0b2.jpg",
              "https://i.pinimg.com/736x/44/75/cf/4475cf227f367f74d7dfe6d7e3a64086.jpg",

            ].map((img, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  src={img}
                  className="d-block w-100"
                  alt="Salon"
                  style={{ height: "85vh", objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="fw-bold">Luxury Salon Experience</h2>
                  <p>Style • Care • Confidence</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SERVICES */}
       <section id="services" className="container py-5">
      <h2 className="text-center fw-bold mb-4">Our Services</h2>

      <div className="row g-4">
        {services.map((service, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">

              <img
                src={service.img}
                className="card-img-top"
                alt={service.title}
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5 className="card-title fw-bold">
                  {service.title}
                </h5>

                <p className="card-text">
                  {service.desc}
                </p>

                <Link to={`/available?specialization=${service.specialization}`}>
                  <button className="btn btn-dark">
                    Book Now
                  </button>
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-2">What Our Clients Say</h2>
          <p className="text-center text-muted mb-5">
            Trusted by our customers for quality, care, and style
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-white shadow-sm rounded h-100">
                <div className="mb-2 text-warning">
                  ★★★★★
                </div>
                <p className="fst-italic">
                  “Absolutely amazing service. The staff is highly professional and
                  made me feel comfortable throughout the session.”
                </p>
                <h6 className="fw-bold mb-0">Ananya Sharma</h6>
                <small className="text-muted">Regular Customer</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white shadow-sm rounded h-100">
                <div className="mb-2 text-warning">
                  ★★★★★
                </div>
                <p className="fst-italic">
                  “One of the best salon experiences I’ve had. Clean ambience,
                  excellent service, and great attention to detail.”
                </p>
                <h6 className="fw-bold mb-0">Rahul Verma</h6>
                <small className="text-muted">First-time Visitor</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white shadow-sm rounded h-100">
                <div className="mb-2 text-warning">
                  ★★★★☆
                </div>
                <p className="fst-italic">
                  “Loved the styling and care provided. The team really knows what
                  suits you best. Highly recommended!”
                </p>
                <h6 className="fw-bold mb-0">Sneha Patel</h6>
                <small className="text-muted">Makeup Client</small>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* GALLERY */}
      <section id="gallery" className="container py-5">
        <h2 className="text-center fw-bold mb-4">Gallery</h2>

        <div className="row g-3">
          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/1200x/f4/b9/0d/f4b90dbddfa300f8a7f09ad5c70e5be8.jpg"
              className="img-fluid rounded shadow-sm"
              alt="Hair Styling"
            />
          </div>

          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/736x/18/ae/1c/18ae1c2009fd4f8eb0fa8ef7f0514430.jpg"
              className="img-fluid rounded shadow-sm"
              alt="Salon girl"
            />
          </div>

          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/736x/5b/05/05/5b05055687e21d153761dd71ca7dad59.jpg"
              className="img-fluid rounded shadow-sm"
              alt="nail"
            />
          </div>

          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/736x/10/2c/6f/102c6f7a9da3735e6370448a11f3d2be.jpg"
              className="img-fluid rounded shadow-sm"
              alt="Hair cut"
            />
          </div>

          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/1200x/67/93/9f/67939faaadb8ac79d0dbe0009b2421e8.jpg"
              className="img-fluid rounded shadow-sm"
              alt="facial"
            />
          </div>

          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/736x/08/9f/6b/089f6bdecf2b9ae5ecbde221aa4682db.jpg"
              className="img-fluid rounded shadow-sm"
              alt="Spa Treatment"
            />
          </div>
        </div>
      </section>


      {/* ABOUT */}
      <section id="about" className="bg-dark text-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold">About Us</h2>
          <p className="mt-3">
            Since <strong>2004</strong>, SalonEase has been delivering premium
            beauty services with passion and professionalism.
          </p>
          <p>📍 Kochi, Kerala</p>
          <div className="mt-3">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=kochi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="250"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container py-5 text-center">
        <h2 className="fw-bold">Contact Us</h2>
        <p className="mt-3">📞 +91 98765 43210</p>
        <p>✉️ support@salonEase.com</p>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-light text-center py-3">
        © 2026 SalonEase. All Rights Reserved.
      </footer>
    </>
  );
}

export default Home;
