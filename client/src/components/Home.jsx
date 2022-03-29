import React,{useContext} from 'react';
import { NavLink } from "react-router-dom";
import { UserContext } from '../App';
const Home = () => {
  const {authImg}=useContext(UserContext);
  console.log(`home's : ${authImg}`);
  return (
    <section className="sign-in" style={{ "place-items": "unset" }}>
      <div className="container mt-5">
        <div className="signin-content">
          <div className="d-grid gap-2 col-6 mx-auto">
            <NavLink
              className="btn btn-primary"
              
            to="/2FA"
            >
              Verify a certificate
            </NavLink>
            <button
              className="btn btn-success"
              type="button"
              
            >
              Admin login
            </button>
            <button
              className="btn btn-warning"
              type="button"
              
            >
              Go to college website
            </button>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home;