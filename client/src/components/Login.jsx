import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/login.css";
import loginpic from "../public/nitdgp_logo.png";
import { UserContext } from "../App";
import Capture from "./Capture";
const Login = () => {
  const { isAdmin, setIsAdmin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(false);
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();

    var b64image = window.localStorage.getItem("b64image");

    try {
      const res = await fetch("/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
          b64image: `${b64image}`,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        window.alert("Login Successfull");
        console.log(data);
        setIsAdmin(true);
        navigate("/loginMenu");
      } else {
        if (data.message === "FNM") {
          window.alert("Face not matching");
        } else {
          window.alert("Invalid credentials");
        }
      }
      /* 
        const res = await fetch('http://localhost:5000/test', {
            method:"POST",
            credentials: 'include',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username:email,
            })
        }); */
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section className="sign-in">
        <div className="container mt-5">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={loginpic} alt="Login pic" />
              </figure>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign up</h2>
              <Capture />
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log In"
                    onClick={handleLogin}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
