const axios = require("axios");
export const mxFaceCompare = async (imgURL,b64Img) => {
  let fcimage = await axios.get(
    imgURL,
    { responseType: "arraybuffer" }
  );
  let returnedB64 = Buffer.from(fcimage.data).toString("base64");

  let fcimage2 = b64Img;
  let returnedB642 = Buffer.from(fcimage2.data).toString("base64");

  
  const fcres = await axios.post(
    `https://faceapi.mxface.ai/api/face/verify`,
    { encoded_image1: returnedB64, encoded_image2: returnedB642 },
    {
      headers: {
        subscriptionkey: "vtnkH72bkXBjTFbF4380",
        "Content-Type": "application/json",
      },
    }
  );
  const fcdata = await fcres.data;
  console.log(fcdata);
  return fcdata;
};

