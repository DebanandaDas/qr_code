import React,{useEffect} from 'react'
import ShowStudent from './ShowStudent';
import { useNavigate } from 'react-router-dom';
import "./CSS/addedStudPreview.css"

const AddedStudentPreview = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const navigate=useNavigate();
  return (
    <>
    <div className="container">
       <h3> Following details added:</h3>
    </div>
    <ShowStudent/>
    <div className="container-fluid">
        <div className="container">

        <button className='btn btn-danger ok-btn' onClick={(e)=>{
          e.preventDefault();
          navigate("/loginMenu");

        }}>OK</button>
        </div>
        </div>
    </>
  )
}

export default AddedStudentPreview;