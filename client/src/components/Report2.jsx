import { React, useEffect, useState,useContext } from "react";
import myImg from "../public/myImg.jpg";
import "./CSS/report2.css";
import {  useNavigate } from "react-router-dom";
import { UserContext } from "../App";


const Report2 = () => {
  const {authImg,setAuthImg} =useContext(UserContext);
  const b64image=window.localStorage.getItem('b64image');
  console.log(`inside report : ${b64image}`);
  var username = new URLSearchParams(window.location.search).get("username");
  var password = new URLSearchParams(window.location.search).get("password");
  const [loaded, setLoaded] = useState(false);
  const [isAuthentic, setIsAuthentic] = useState(false);
  const [student, setStudent] = useState({});
  const navigate = useNavigate();
  const getData = async () => {
    try {
      /* const fdata= new FormData();
      fdata.append('b64image',b64image); */
      const res = await fetch(
        `/students/verify?username=${username}&password=${password}`,
        {

          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({b64image:`${b64image}`}),
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.status === 500) {
        setIsAuthentic(false);
        setLoaded(true);}
        else if(res.status===405)
        {
          setIsAuthentic(false);
          setLoaded(true);
          console.log(data.message);
          window.alert("faces are not matching");
        }
       else if (res.status === 200) {
        try {
          const res2 = await fetch(`/students/${data.id}`, {
            method: "GET",
            headers: {
              Accept: "appllication/json",
              "Content-Type": "application/json",
            },
          });
          const data2= await res2.json();
          //setStudent(data2.student);
          console.log(data2.student);
          setStudent({name: data2.student.name,
                      address: data2.student.address,
                      department: data2.student.department,
                      regno: data2.student.regNo,
                      rollno: data2.student.roll,
                      photo: data2.student.photo.url,
                      sem1: (data2.student.gradeCards[0])? data2.student.gradeCards[0].url :"",
                      sem2: (data2.student.gradeCards[1])? data2.student.gradeCards[1].url:"",
                      sem3:(data2.student.gradeCards[2])? data2.student.gradeCards[2]:"",
                      sem4:(data2.student.gradeCards[3])? data2.student.gradeCards[3]:""});
          console.log(student);
           setIsAuthentic(true);
          setLoaded(true);
          console.log(`IA: ${isAuthentic} LD: ${loaded}`);

        } catch (errr) {
          console.log(errr);
        }
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const Authentic = () => {
    return (
      <>
        <div className="report-parent-container">
          <div className="report-container">
            <div className="report-box">
              <img
                src={
                  student.photo
                }
                alt="studImg"
                className="repo-img"
              />
            </div>
            <div className="report-box info-box">
              <div className="info-box-inside ">
                <span className="repo-info-label">Name:</span>
                <span className="repo-name">{student.name}</span>
              </div>
              <div className="info-box-inside">
                <span className="repo-info-label">Department:</span>
                <span className="repo-name">{student.department}</span>
              </div>
              <div className="info-box-inside">
                <span className="repo-info-label">Roll number:</span>
                <span className="repo-name">{student.rollno}</span>
              </div>
              <div className="info-box-inside">
                <span className="repo-info-label">Reg number:</span>
                <span className="repo-name">{student.regno}</span>
              </div>
              <div className="info-box-inside">
                <span className="repo-info-label">Address:</span>
                <span className="repo-name">{student.address}</span>
              </div>
            </div>
            <div className="report-box box-3">
              <div className="inside-box">
                <a
                  className="btn btn-primary"
                  href={student.sem1}
                  target="_blank"
                  role="button"
                >
                  Semester 1
                </a>
                <a
                  className="btn btn-primary"
                  href={student.sem2}
                  target="_blank"
                  role="button"
                >
                  Semester 2
                </a>
              </div>
              <div className="inside-box">
                <a
                  className="btn btn-primary"
                  href="https://nitdgp.ac.in/"
                  target="_blank"
                  role="button"
                >
                  Semester 3
                </a>
                <a
                  className="btn btn-primary"
                  href={student.sem4}
                  target="_blank"
                  role="button"
                >
                  Semester 4
                </a>
              </div>
            </div>
            <div className="report-box box-3">
              <div className="inside-box">
                <a
                  className="btn btn-primary"
                  href="https://nitdgp.ac.in/"
                  target="_blank"
                  role="button"
                >
                  Semester 5
                </a>
                <a
                  className="btn btn-primary"
                  href={student.sem6}
                  target="_blank"
                  role="button"
                >
                  Semester 6
                </a>
              </div>
              <div className="inside-box">
                <a
                  className="btn btn-primary"
                  href={student.sem7}
                  target="_blank"
                  role="button"
                >
                  Semester 7
                </a>
                <a
                  className="btn btn-primary"
                  href="https://nitdgp.ac.in/"
                  target="_blank"
                  role="button"
                >
                  Semester 8
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const NotAuthentic = () => {
    return (
      <div className="report-parent-container">
        <div className="report-container">
          <h1 className="warning">
            Student not found. Please Contact College administration.
          </h1>
        </div>
      </div>
    );
  };

  
  const Loading = () => {
    return (
      <div className="report-parent-container">
        <div className="report-container">
          <h1 className="warning">Loading... Please wait for a moment.</h1>
        </div>
      </div>
    );
  };

  return <> {loaded === false ? <Loading /> : isAuthentic===false ? <NotAuthentic/> : <Authentic/> }</>;
};

export default Report2;
