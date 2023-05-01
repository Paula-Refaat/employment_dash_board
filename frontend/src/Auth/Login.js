import React, { useState } from "react";
import "./Style/Login.css";
import axios from "axios";
import { setAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:5000/auth/login", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };
  
  return (
    <div className="login-container">
      <h1 className="title">Login Form</h1>
      {login.err.map((error, index) => (
            // <Alert key={index} variant="danger" className="p-2">
            //      {(error.msg)}
            //   </Alert>   
             
              <div className="btn btn-contact" >
                {(error.msg)}
              </div>
      
      ))}




<div class = "total">
        <div class="loginbox">
		<form onSubmit={LoginFun}>
			{/* <p>Username</p> */}
			<input type="text"
      placeholder="Enter Email" 
      required
      value={login.email}
      onChange={(e) => setLogin({ ...login, email: e.target.value })}
      />
      <br/><br/><br/>
			{/* <p>Password</p> */}
			<input type="Password"
      placeholder="Enter Password"
      required
      value={login.password}
      onChange={(e) => setLogin({ ...login, password: e.target.value })}
         />

			<input type="submit" name="" value="Login" disabled={login.loading === true} />
		</form> 
        </div>
        </div>
    </div>
  );
};

export default Login;