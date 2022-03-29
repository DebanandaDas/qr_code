import React, { useState, useEffect, useContext } from "react";
import "./CSS/addStudent.css";
import addStudentImg from "../public/addStudent.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const ModifyStud = () => {
  const { regNmbr, setRegNmbr } = useContext(UserContext);
  const navigate = useNavigate();
  const [Image, setImage] = useState();
  const [sem1, setSem1] = useState();
  const [sem2, setSem2] = useState();
  const [sem3, setSem3] = useState();
  const [sem4, setSem4] = useState();
  const [sem5, setSem5] = useState();
  const [sem6, setSem6] = useState();
  const [sem7, setSem7] = useState();
  const [sem8, setSem8] = useState();
  const [studentState, setStudentState] = useState({
    username: "",
    password: "",
    name: "",
    roll: "",
    regNo: "",
    department: "",
    address: "",
  });
  const [newStudentState, setNewStudentState] = useState({
    username: "",
    password: "",
    name: "",
    roll: "",
    regNo: "",
    department: "",
    address: "",
  });
  const getStudent = async (id) => {
    try {
      const res = await fetch(`/students/regNo/${id}`, {
        method: "GET",

        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setStudentState(data.student);
      setNewStudentState(data.student);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudent(regNmbr);
  }, []);

  const addImage = async () => {
    const fdata = new FormData();
    fdata.append("photo", Image);
    try {
      const res = await fetch(
        `/students/putphoto/${studentState._id}`,
        {
          method: "PUT",
          credentials: "include",

          body: fdata,
        }
      );
      const data = await res.json();
      if (data.success === true) {
        window.alert("image added");
      } else {
        window.alert("image adding failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addGradeCardsUtil = async (id, semno) => {
    const fdata = new FormData();
    if (semno === 1) {
      fdata.append("gradecard", sem1);
    } else if (semno === 2) {
      fdata.append("gradecard", sem2);
    } else if (semno === 3) {
      fdata.append("gradecard", sem3);
    } else if (semno === 4) {
      fdata.append("gradecard", sem4);
    } else if (semno === 5) {
      fdata.append("gradecard", sem5);
    } else if (semno === 6) {
      fdata.append("gradecard", sem6);
    } else if (semno === 7) {
      fdata.append("gradecard", sem7);
    } else if (semno === 8) {
      fdata.append("gradecard", sem8);
    }

    try {
      const res = await fetch(
        `/students/putgradecard/${id}/${semno}`,
        {
          method: "PUT",
          credentials: "include",

          body: fdata,
        }
      );
      const data = await res.json();
      if (data.success === true) {
        window.alert(`sem${semno} added`);
      } else {
        window.alert(`sem${semno} adding failed`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const addGradeCards = async (id) => {
    if (sem1) {
      await addGradeCardsUtil(id, 1);
    }
    if (sem2) {
      await addGradeCardsUtil(id, 2);
    }
    if (sem3) {
      await addGradeCardsUtil(id, 3);
    }
    if (sem4) {
      await addGradeCardsUtil(id, 4);
    }
    if (sem5) {
     await addGradeCardsUtil(id, 5);
    }
    if (sem6) {
      await addGradeCardsUtil(id, 6);
    }
    if (sem7) {
     await addGradeCardsUtil(id, 7);
    }
    if (sem8) {
     await addGradeCardsUtil(id, 8);
    }
  };

  const modifyHandler = async (e) => {
    e.preventDefault();

    if (studentState !== newStudentState) {
      const fdata = new FormData();
      fdata.append("department", newStudentState.department);
      fdata.append("username", newStudentState.username);
      fdata.append("password", newStudentState.password);
      fdata.append("name", newStudentState.name);
      fdata.append("regNo", newStudentState.regNo);
      fdata.append("roll", newStudentState.roll);
      try {
        const res = await fetch(
          `/students/putTextParams/${studentState._id}`,
          {
            method: "PUT",
            credentials: "include",

            body: fdata,
          }
        );
        const data = await res.json();
        if (data.success === true) {
          window.alert("Text updated");
        } else {
          window.alert("Text update failed");
        }
      } catch (err) {
        console.log(err);
      }
    }
    if(Image)
    {
     
      await addImage();
    }
    await addGradeCards(studentState._id);
    setRegNmbr(studentState.regNo);
    navigate("/preview");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container pt-2">
          <div className="row">
            <div className="col-md-12">
              <div className="img-div">
                <img
                  className="img-box"
                  src={addStudentImg}
                  alt="studentImg"
                />
              </div>
            </div>
          </div>
          <form className="row g-4 ">
            <div className="input-group mb-3 col-6">
              <label className="input-group-text" for="inputGroupFile01">
                Student Image
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                value={newStudentState.name}
                id="inputEmail4"
                onChange={(e) => {
                  setNewStudentState((pre) => ({
                    ...pre,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Department
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                value={newStudentState.department}
                onChange={(e) => {
                  setNewStudentState((pre) => ({
                    ...pre,
                    department: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Registration Number
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                value={newStudentState.regNo}
                onChange={(e) => {
                  setNewStudentState((pre) => ({
                    ...pre,
                    regNo: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Roll Number
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                value={newStudentState.roll}
                onChange={(e) => {
                  setNewStudentState((pre) => ({
                    ...pre,
                    roll: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="col-12">
              <label for="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Permanent Address"
                value={newStudentState.address}
                onChange={(e) => {
                  setNewStudentState((pre) => ({
                    ...pre,
                    address: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="col-12">
              <h2>Upload the Grade Cards</h2>
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 1
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
                onChange={(e) => {
                  setSem1(e.target.files[0]);
                }}
              />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 2
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
              />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 3
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
              />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 4
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
              />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 5
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
              />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 6
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
              />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 7
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
              />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 8
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={modifyHandler}
              >
                Modify
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModifyStud;
