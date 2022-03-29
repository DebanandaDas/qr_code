import React, { useState, useRef, useContext } from "react";
import "./CSS/addStudent.css";
import addStudentImg from "../public/addStudent.png";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";



const AddStudent = () => {
  const navigate = useNavigate();
  const {regNmbr,setRegNmbr}=useContext(UserContext);
  const [Image , setImage] = useState("");
  const [sem1, setSem1] = useState();
  const [sem2, setSem2] = useState();
  const [sem3, setSem3] = useState();
  const [sem4, setSem4] = useState();
  const [sem5, setSem5] = useState();
  const [sem6, setSem6] = useState();
  const [sem7, setSem7] = useState();
  const [sem8, setSem8] = useState();
  const [studentState, setStudentState]= useState({username:"",password:"",name:"", roll:"",regNo:"",department:"",address:""});        
    
  const addImage= async (id)=>
  {
    const fdata= new FormData();
    fdata.append('photo',Image);
    try{
      const res= await fetch(`http://localhost:5000/students/putphoto/${id}`,{
        method: "PUT",
        credentials: 'include',
        
        body: fdata,
  
        });
        const data=  await res.json();
        if(data.success=== true)
        {
          window.alert("image added");
        }
        else{
          window.alert("image adding failed");
        }


      }
      catch(err)
      {
        console.error(err);
      }
      return;

  }

  const addGradeCardsUtil= async (id,semno)=>
  {

    const fdata= new FormData();
    if(semno===1)
    {
      fdata.append('gradecard',sem1);
    }
    else if(semno===2)
    {
      fdata.append('gradecard',sem2);
    }
    else if(semno===3)
    {
      fdata.append('gradecard',sem3);
    }
    else if(semno===4)
    {
      fdata.append('gradecard',sem4);
    }
    else if(semno===5)
    {
      fdata.append('gradecard',sem5);
    }
    else if(semno===6)
    {
      fdata.append('gradecard',sem6);
    }
    else if(semno===7)
    {
      fdata.append('gradecard',sem7);
    }
    else if(semno===8)
    {
      fdata.append('gradecard',sem8);
    }
    
    try{
      const res= await fetch(`/students/putgradecard/${id}/${semno}`,{
        method: "PUT",
        credentials: 'include',
        
        body: fdata,
  
        });
        const data= await res.json();
        if(data.success=== true)
        {
          window.alert(`sem${semno} added`);
        }
        else{
          window.alert(`sem${semno} adding failed`);
        }


      }
      catch(err)
      {
        console.error(err);
      }

  }
  const addGradeCards= async (id)=>
  {
    if(sem1)
    {
      await addGradeCardsUtil(id, 1);
    }
    if(sem2)
    {
      await addGradeCardsUtil(id, 2);
    }
    if(sem3)
    {
     await addGradeCardsUtil(id, 3);
    }
    if(sem4)
    {
     await addGradeCardsUtil(id, 4);
    }
    if(sem5)
    {
      await addGradeCardsUtil(id, 5);
    }
    if(sem6)
    {
     await addGradeCardsUtil(id, 6);
    }
    if(sem7)
    {
     await addGradeCardsUtil(id, 7);
    }
    if(sem8)
    {
     await addGradeCardsUtil(id, 8);
    }
    
    return;
  }

  const createStudent= async (e)=>{
    e.preventDefault();
    
    try{
    const res= await fetch(`/students/createFromQueryTextParams?username=${studentState.username}&name=${studentState.name}&roll=${studentState.roll}&regNo=${studentState.regNo}&department=${studentState.department}&address=${studentState.address}&password=${studentState.password}`,{
      method: "POST",
      credentials: 'include',
      
      body: JSON.stringify({message:"adding with query params"}),

      }); 
    
    const data= await res.json();
    if(res.status===201)
    {
      window.alert("added the text successfully");
      console.log(data.id);
       await addImage(data.id);
      await addGradeCards(data.id);
      setRegNmbr(studentState.regNo);
      navigate('/preview');


    }
    else if(res.status === 400)
    {
      console.log(data);
    }
    else if(res.status===500)
    {
      window.alert("not auth");
    }

  }
  catch(err)
  {
    window.alert(err);
  }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container pt-2">
          <div className="row">
            <div className="col-md-12 img-row">
              <div className="img-div">

              <img className="img-box" src={(Image) ? Image: addStudentImg}  alt="studentImg" />
              </div>
              
            </div>
          </div>
          <form className="row g-4 ">
            <div className="input-group mb-3 col-6">
              <label className="input-group-text" for="inputGroupFile01">
                Student Image
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={(e)=> setImage(e.target.files[0])} />
            </div>
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="inputEmail4" onChange={e=>{ setStudentState((pre)=>({ ...pre,name : e.target.value}))}} />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Department
              </label>
              <input type="text" className="form-control" id="inputPassword4" onChange={e=>{ setStudentState((pre)=>({ ...pre,department : e.target.value}))}} />
            </div>
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Registration Number
              </label>
              <input type="text" className="form-control" id="inputEmail4" onChange={e=>{ setStudentState((pre)=>({ ...pre, regNo : e.target.value}))}}/>
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Roll Number
              </label>
              <input type="text" className="form-control" id="inputPassword4" onChange={e=>{ setStudentState((pre)=>({ ...pre, roll : e.target.value}))}}/>
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
                onChange={e=>{ setStudentState((pre)=>({ ...pre,address : e.target.value}))}}
              />
            </div>
            <div className="col-12">
              <label for="inputAddress" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="username"
                onChange={e=>{ setStudentState((pre)=>({ ...pre,username : e.target.value}))}}
              />
            </div>
            <div className="col-12">
              <label for="inputAddress" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="password"
                onChange={e=>{ setStudentState((pre)=>({ ...pre,password : e.target.value}))}}
              />
            </div>
            <div className="col-12">
                <h2>Upload the Grade Cards</h2>
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 1
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={e=> setSem1(e.target.files[0])}/>
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 2
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={e=> setSem2(e.target.files[0])} />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 3
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={e=> setSem3(e.target.files[0])}/>
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 4
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={e=> setSem4(e.target.files[0])} />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 5
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={e=> setSem5(e.target.files[0])} />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 6
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={e=> setSem6(e.target.files[0])}/>
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 7
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={e=> setSem7(e.target.files[0])} />
            </div>
            <div className="col-6 input-group mb-3 ">
              <label className="input-group-text" for="inputGroupFile01">
                Semester 8
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={e=> setSem8(e.target.files[0])}/>
            </div>


            <div className="col-12">
              <button type="submit" className="btn btn-primary" onClick={createStudent}>
                Add Student
              </button>
            </div>
          </form>
           <div>
            {studentState.name}// {studentState.department}//{studentState.regNo}
          </div> 
        </div>
      </div>
    </>
  );
};

export default AddStudent;
