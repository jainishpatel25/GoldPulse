// import React from "react";
// import { FaSearch } from "react-icons/fa";
// import "../../styles/main.css"; // custom css

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg custom-navbar">
//       <div className="container-fluid">
//         {/* Logo */}
//         <a className="navbar-brand logo" href="#">
//           GoldPulse
//         </a>

//         {/* Toggler (for mobile) */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Links */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mx-auto">
//             <li className="nav-item">
//               <a className="nav-link active" href="#">
//                 Home
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 Prices
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 Analytics
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 About
//               </a>
//             </li>
//           </ul>

//           {/* Search Icon */}
//           <div className="search-icon">
//             <FaSearch />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// src/components/Navbar.js
import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { FaSearch, FaBell } from "react-icons/fa";
import "../../styles/main.css";

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar px-4">
      {/* Logo */}
      <Navbar.Brand href="#home" className="d-flex align-items-center text-white fw-bold">
        <span className="me-2">🥇</span> Gold Tracker
      </Navbar.Brand>

      {/* Nav Links */}
      <Nav className="me-auto ms-4">
        <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
        <Nav.Link href="/goldsection" className="nav-link-custom">Prices</Nav.Link>
        <Nav.Link href="#news" className="nav-link-custom">News</Nav.Link>
        <Nav.Link href="#analysis" className="nav-link-custom">Analysis</Nav.Link>
      </Nav>

      {/* Search */}
<Form className="d-flex align-items-center search-box">
  <FaSearch className="search-icon" />
  <FormControl
    type="search"
    placeholder="Search"
    className="search-input"
  />
  
</Form>


      {/* Icons (Bell + Profile) */}
      <div className="d-flex align-items-center ms-3">
        <FaBell className="text-white me-3 bell-icon" />
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="profile-img"
        />
      </div>
    </Navbar>
  );
}

export default CustomNavbar;
