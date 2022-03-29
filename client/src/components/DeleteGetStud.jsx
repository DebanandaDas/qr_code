import React, { useState } from "react";
import "./CSS/login.css";
import "./CSS/search.css";
const DeleteGetStud = () => {
  const [regNo, setRegNo] = useState("");
  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/students/regNo/${regNo}`,
        {
          method: "GET",

          headers: {
            Accept: "appllication/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.status === 400) {
        window.alert("Invalid registration number.");
      } else {
        try {
          const res2 = await fetch(
            `/students/${data.student._id}`,
            {
              method: 'DELETE',
              credentials: 'include',
              
            }
          );
          const data2 = await res2.json();
          if (data2.success === true) {
            window.alert("Deleted successfully");
          } else {
            window.alert(`${data2.message}`);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="sign-in" style={{ "place-items": "unset" }}>
      <div className="container mt-5">
        <div className="search-content">
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <label for="inputPassword2" className="sr-only">
                Registration Number
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword2"
                placeholder="Reg No."
                onChange={(e) => {
                  setRegNo(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={deleteHandler}
            >
              Delete Student
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DeleteGetStud;
