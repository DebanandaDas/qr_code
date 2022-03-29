import React, { useState, createContext } from "react";
import "./App.css";
import Report from "./components/Report";
import Codes from "./components/Codes";
import Scan from "./components/Scan";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Report2 from "./components/Report2";
import Login from "./components/Login";
import QrFaceCam from "./components/QrFaceCam";
import LoginMenu from "./components/LoginMenu";
import AddStudent from "./components/AddStudent";
import ModifyGetStud from "./components/ModifyGetStud";
import ShowGetStud from "./components/ShowGetStud";
import DeleteGetStud from "./components/DeleteGetStud";
import Capture from "./components/Capture";
import ShowStudent from "./components/ShowStudent";
import ModifyStud from "./components/ModifyStud";
import Home from "./components/Home";
import AddedStudentPreview from "./components/AddedStudentPreview";


export const UserContext = createContext();

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [regNmbr, setRegNmbr]=useState();
  const [authImg,setAuthImg]=useState();
  var authImage="";

  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin,regNmbr,setRegNmbr,authImg,setAuthImg ,authImage}}>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />

          <Route path="/codes" element={<Codes />} />
          <Route path="/report" element={<Report2 />} />
          <Route path="/AdminLogin" element={<Login />} />

          <Route path="/qrFaceCam" element={<QrFaceCam />} />
          <Route path="/loginMenu" element={<LoginMenu />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/modifyGetStud" element={<ModifyGetStud />} />
          <Route path="/showGetStud" element={<ShowGetStud />} />
          <Route path="/deleteGetStud" element={<DeleteGetStud />} />
          <Route path="/modifyStudent" element={<ModifyStud />} />
          <Route path="/showStudent" element={<ShowStudent />} />

          <Route path="/2FA" element={<Capture />} />
          <Route path="/preview" element={<AddedStudentPreview />} />
          
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
