import React,{useContext} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import "./CSS/NavBar.css";
import logo from "../public/NitDGPlogo.png";
import {UserContext} from "../App";

const NavBar = () => {
  const myCSS = {
    "background-color": "#252555",
    
  };
  const { isAdmin, setIsAdmin } = useContext(UserContext);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark "
        style={myCSS}
      >
        <div className="container-fluid">
           <NavLink className="nav-logo" to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          <NavLink className="navbar-brand nav-clg-name nav-clg-name-lg" to="/">
            National Institute of Technology,Durgapur
          </NavLink> 
          <div className="nav-clg-name-sm">
          <NavLink className="navbar-brand nav-clg-name  " to="/">
            NIT Durgapur
          </NavLink> 
          </div>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            {(isAdmin===false) ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className=" nav-link active btn btn-success login-btn"
                  aria-current="page"
                  to="/AdminLogin"
                >
                  Admin login
                </NavLink>
              </li>
            </ul> : <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className=" nav-link active btn btn-success login-btn"
                  aria-current="page"
                  to="/AdminLogin"
                >
                  Logout
                </NavLink>
              </li>
            </ul>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
