import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";
import { FaSearch, FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

function CustomNavbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   const updateUser = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // ✅ updated key
  setUser(loggedInUser);
};

    // Initial load
    updateUser();

    // Listen to custom login/logout events
    window.addEventListener("login", updateUser);
    window.addEventListener("logout", updateUser);

    return () => {
      window.removeEventListener("login", updateUser);
      window.removeEventListener("logout", updateUser);
    };
  }, []);


  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center text-white fw-bold">
          <span className="me-2">🥇</span> Gold Tracker
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Nav className="me-auto ms-4 my-2 my-lg-0">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/predicationpage" className="nav-link-custom">Analysis</Nav.Link>
            <Nav.Link as={Link} to="/mygold" className="nav-link-custom">Invesment</Nav.Link>
            <Nav.Link as={Link} to="/setalert" className="nav-link-custom">Alert</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact Us</Nav.Link>
          </Nav>

          {/* <Form className="d-flex align-items-center search-box my-2 my-lg-0">
            <FaSearch className="search-icon" />
            <FormControl type="search" placeholder="Search" className="search-input" />
          </Form> */}

          <div className="d-flex align-items-center ms-lg-3 mt-2 mt-lg-0">
            <FaBell className="text-white me-3 bell-icon" />
            {!user ? (
              <Button variant="warning" size="sm" onClick={() => navigate("/login")}>
                Sign Up
              </Button>
            ) : (
              <div className="d-flex align-items-center">
                <img
                  src={user?.profilePic || "https://i.pravatar.cc/40"}
                  alt="profile"
                  className="profile-img"
                  onClick={() => navigate("/profile")}
                />
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
