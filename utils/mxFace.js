const axios = require("axios");
module.exports.mxFaceCompare = async (imgURL,b64Img) => {
  
  
  let fcimage = await axios.get(
    imgURL,
    { responseType: "arraybuffer" }
  );
  let returnedB64 = Buffer.from(fcimage.data).toString("base64");

  
  /* let fcimage2 = await axios.get(
    b64Img,
    { responseType: "arraybuffer" }
  );
  let returnedB642 = Buffer.from(fcimage.data).toString("base64"); */
  let returnedB642= b64Img;

   //console.log(`inside mxface: ${imgURL}`);
  //console.log(`inside mxface : ${returnedB64}`);
  const fcres = await axios.post(
    `https://faceapi.mxface.ai/api/face/verify`,
    { encoded_image1: returnedB642, encoded_image2: returnedB64 },
    {
      headers: {
        "subscriptionkey": "vtnkH72bkXBjTFbF4380",
        "Content-Type": "application/json",
      },
    }
  );
  const fcdata = await fcres.data;
  //console.log(fcdata);

  return fcdata;
};

