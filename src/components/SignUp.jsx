import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { RegisterAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import QRCode from "qrcode";
const SignUp = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [isQRScanned, setIsQRScanned] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [qrCode, setQrCode] = useState(null);
  useEffect(() => {}, []);
  const handleQrScanConfirmation = () => {
    setIsQRScanned(true);
    navigate("/login");
  };
  const handleRegister = () => {
    const fullName = document.querySelector("#fullName").value;
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#pass").value;

    const payload = { fullName, email, pass };
    RegisterAPI(payload)
      .then((res) => {
        console.log("data in register: ", res);
        const { secret } = res.data;
        const otpAuth = `otpauth://totp/${email}?secret=${secret}&issuer=Node44-youtube`;
        QRCode.toDataURL(otpAuth)
          .then((qrCodeURL) => {
            setQrCode(qrCodeURL);
            toast.success(res.message);
          })
          .catch();
        // navigate("/login");
      })
      .catch((err) => {
        console.log("error in handleRegister: ", err);

        // toast.error(err.response.data.message);
      });
  };
  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          {/* //fullName */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Full name
            </label>
            <input className="form-control" id="fullName" />
          </div>

          {/* //email */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          {/* //pass */}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      {/* Hiển thị mã QR nếu có */}
      {qrCode && (
        <div className="text-center mt-4">
          <h4>Scan the QR Code with Google Authenticator</h4>
          <img src={qrCode} alt="QR Code" />
          {/* <p>Secret: {secret}</p> Có thể hiển thị secret để sao lưu */}
          <button
            onClick={handleQrScanConfirmation}
            type="button"
            className="btn btn-success mt-3"
          >
            I've Scanned the QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
