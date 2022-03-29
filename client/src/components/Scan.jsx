import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import "./CSS/scan.css";
import {useNavigate} from "react-router-dom"

/*export default class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      scanned: false,
      result: "Scan The qr code",
    };

    this.handleScan = this.handleScan.bind(this);
  }
/*   convertTo10(str) {
    var ans = 0;
    for (var i = 0; i < str.length; i++) {
      ans = ans * 9 + (str[i] - "0");
    }
    return ans;
  }
  decodeQR = (data) => {
    const nums = data.split(9);
    console.log(nums);
    var ans = "";
    for (var i = 0; i < nums.length; i++) {
      ans += (i % 2 ? "1" : "0").repeat(this.convertTo10(nums[i]));
    }
    console.log(ans);
    var c = document.getElementById("myCanvas");
    console.log(c);
    var ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 200, 240);
    ctx.fillStyle = "black";
    for (i = 0; i < 120; i++) {
      for (var j = 0; j < 100; j++) {
        if (ans[i * 100 + j] === "0") {
          ctx.fillRect(2 * j, 2 * i, 2, 2);
        }
      }
    }

    return nums;
  }; 
  
  const navigate = useNavigate();
  
  handleScan(data) {
    if (data !== null) {
      this.setState({
        scanned: true,
        result: data.text
      });
      console.log(this.state.result);
      this.navigate("this.state.result");
    }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
 
    return (
      <div className="scan-container">
        <div className="scan-box">
          
            <QrReader
              delay={this.state.delay}
              
              onError={this.handleError}
              onScan={this.handleScan}
              style={{"border":"solid 2px #b4b4b4", "height": "300px", "width":"320px", "margin-top":"30px", "margin-left":"135px","padding-top":"0px"}}

            />
          
          <p className="qr-guide">Scan the QR code here</p>
          {/* <canvas id="myCanvas" width="200" height="240" color="blue" style={{border:"5px blue solid"}} ></canvas> }
        </div>
      </div>
    );
  }
}*/



const Scan = () => {

  const [scanRes,setScanRes]= useState("scan the QR");
  const delay= 100;
  const [isScanned, setIsScannced]= useState(false);
  
  const navigate= useNavigate();
  var flag="";
  const handleScan= (data)=> {
    if (data !== null) {
    flag= data.text;;
      console.log(data.text);
      console.log(flag);
      let len= flag.length;
      let redirect = flag.substring(22,len);
      console.log(isScanned);
      navigate(`/${redirect}`);
    }
  }
  
  const handleError=(err)=> {
    console.error(err);
  }
  useEffect(()=>{
    setIsScannced(true);
    console.log(isScanned);
  },[flag]);

  return (
    <div className="scan-container">
        <div className="scan-box">
          
            <QrReader
              delay={delay}
              
              onError={handleError}
              onScan={handleScan}
              style={{"border":"solid 2px #b4b4b4", "height": "300px", "width":"320px", "margin-top":"30px", "margin-left":"135px","padding-top":"0px"}}

            />
          
          <p className="qr-guide">Scan the QR code here</p>
          {/* <canvas id="myCanvas" width="200" height="240" color="blue" style={{border:"5px blue solid"}} ></canvas> */}
        </div>
      </div>
  )
}

export default Scan
