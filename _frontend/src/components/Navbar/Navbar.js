import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import { Logo } from "../../components";
import "./Navbar.css";
const Navbar = () => {
  const { toggleSidebar, logoutUser, user } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);

  const toggleDropdown = () => {
    setShowLogout(prev => !prev);
  };
  return (
    <nav className="appNavbar">
      <div className="nav-center">
        <button
          className="toggle-btn"
          onClick={() => {
            toggleSidebar();
            console.log("toggle sidebar");
          }}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={toggleDropdown}>
            <FaUserCircle />
            {user && user.name ? user.name : ""}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showLogout ? "show-dropdown" : ""}`}>
            <NavLink to="/profile" type="button" className="dropdown-btn">
              settings
            </NavLink>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
      {/*    <nav>
        <Link to="/">
          {" "}
          <FaHome />
          Stats
        </Link>
        <Link to="/jobs/add">Add Job</Link>
        <Link to="/jobs">My jobs</Link>
        <Link to="/profile">profile</Link>
      </nav> */}
    </nav>
  );
};

export default Navbar;
