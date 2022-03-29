import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import "./CSS/navbar2.css";
import logo from "../public/NitDGPlogo.png";
import { UserContext } from "../App";

const NavBar2 = () => {
  const myCSS = {
    "background-color": "#252555",
  };
  const { isAdmin, setIsAdmin } = useContext(UserContext);
  return (
    <>
      <nav className="nav-container" style={myCSS}>
        {/* <NavLink className=" nav-logo" to="/">
            <img src={logo} alt="logo" />
          </NavLink> */}
          <img  classname="nav-logo" src={logo} alt="NITDGPlogo" />
        <NavLink className=" nav-clg-name" to="/">
          National Institute of Technology,Durgapur
        </NavLink>

        {isAdmin === false ? (
          <NavLink
            className="  btn btn-success login-btn"
            
            to="/AdminLogin"
          >
            Admin login
          </NavLink>
        ) : (
          <NavLink className="  btn btn-success login-btn" to="/AdminLogin">
            Logout
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default NavBar2;
