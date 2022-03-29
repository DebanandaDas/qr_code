import React, { useEffect, useContext } from "react";
import "./CSS/login.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const LoginMenu = () => {
  const { isAdmin, setIsAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin === false) {
      window.alert("You need to login first");
      navigate("/AdminLogin");
    }
  }, []);

  const addStudentHandler = () => {
    navigate("/addStudent");
    };
    const modifyStudentHandler = () => {
      navigate("/modifyGetStud");
      };
      const showStudentHandler = () => {
        navigate("/showGetStud");
        };
        const deleteStudentHandler = () => {
          navigate("/deleteGetStud");
          };
  return (
    <section className="sign-in" style={{ "place-items": "unset" }}>
      <div className="container mt-5">
        <div className="signin-content">
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-primary"
              type="button"
              onClick={addStudentHandler}
            >
              Add Student
            </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={modifyStudentHandler}
            >
              Modify Student
            </button>
            <button
              className="btn btn-warning"
              type="button"
              onClick={showStudentHandler}
            >
              Show Student
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={deleteStudentHandler}
            >
              Delete Student
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginMenu;
