import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import {
  loginAPI,
  loginAsyncKeyAPI,
  loginFacebook,
} from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";
const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const handleLogin = async () => {
    let email = document.querySelector("#email").value;
    let pass_word = document.querySelector("#pass").value;
    let code = document.querySelector("#code").value;
    loginAsyncKeyAPI({ email, pass_word, code })
      .then((res) => {
        toast(res.message, "success");
        localStorage.setItem("LOGIN_USER", res.data);
        navigate("/");
      })
      .catch((err) => {
        toast.error("loi");
        console.log("error in login on FE:", err);
      });
  };
  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Code
            </label>
            <input className="form-control" id="code" />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
            <Link to={"/forgot-password"} className="text-white mx-3">
              Forgot password
            </Link>
            <ReactFacebookLogin
              appId=""
              fields="name,email,picture"
              callback={(response) => {
                let { id, emai, name } = response;
                loginFacebook({ id, emai, name })
                  .then((res) => {
                    toast.success(res.message);
                    console.log(
                      "response in login by facebook on FE: ",
                      response
                    );
                    localStorage.setItem("LOGIN_USER", res.data);
                    navigate("/");
                  })
                  .catch((err) => {
                    toast.error(err.response.data.message);
                    console.log("error in login by facebook in FE: ", err);
                  });
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
