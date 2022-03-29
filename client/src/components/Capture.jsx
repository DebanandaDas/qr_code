import React, { useState, useCallback, useMemo, useContext } from "react";
import "./CSS/capture.css";
import ImageCapture from "../imageCaptureCode/index.js";
import useWindowDimensions from "./utilities/UseWindowDimension";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
const Capture = () => {
  const navigate = useNavigate();
  const { authImg, setAuthImg } = useContext(UserContext);
  var {authImage}=useContext(UserContext);
  const { height, width } = useWindowDimensions();
  const [imgSrc, setImgSrc] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const onCapture = (imageData) => {
    // read as webP
    setImgSrc(imageData.webP);
    // read as file
    setImgFile(imageData.blob);
    var reader = new FileReader();
    reader.readAsDataURL(imageData.blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      console.log(`base65data: ${base64data}`);
      base64data=base64data.substring(22);
      window.localStorage.setItem('b64image',base64data);
      
      setAuthImg(base64data);
    };

    
    console.log(imgSrc);
    console.log(imgFile);
    
    console.log(`auth img: ${authImg}`);
    const myTimeout= setTimeout(()=>{console.log(`inside timeout auth img: ${authImg}`);},5000);

    // read as blob
    // imageData.blob
  };

  // Use useCallback to avoid unexpected behaviour while rerendering
  const onError = useCallback((error) => {
    console.log(error);
  }, []);

  // Use useMemo to avoid unexpected behaviour while rerendering
  const config = useMemo(() => ({ video: true }), []);
  return (
    <>
      <div className="contaier-fluid">
        <div className="container auth-vid-container">
          <h6>Capture your face to authenticate</h6>
          <ImageCapture
            onCapture={onCapture}
            onError={onError}
            width={width > 540 ? 200 : 300}
            userMediaConfig={config}
          />
          {imgSrc && (
            <>
              <div>
                <div>Captured Image:</div>
                <img src={imgSrc} alt="captured-img" />
              </div>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/scan");
                }}
              >
                Proceed
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Capture;
