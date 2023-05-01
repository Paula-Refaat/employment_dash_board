import React, { useState } from "react";
import axios from "axios";
import { setAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
import "./Style/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    loading: false,
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:5000/auth/register", {
        email: register.email,
        password: register.password,
        name: register.name,
        phone: register.phone,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/login");
      })
      .catch((errors) => {
        setRegister({
          ...register,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Registration Form</h1>
      {register.err.map((error, index) => (
        // <Alert key={index} variant="danger" className="p-2">
        //   {error.msg}
        // </Alert>
              <div className="btn btn-contact" >
                {(error.msg)}
            </div>
      ))}


<div class = "total">
        <div class="loginbox">

		<form onSubmit={RegisterFun}>
			<input type="text"
      placeholder="Enter Full Name"
      value={register.name}
      onChange={(e) => setRegister({ ...register, name: e.target.value })}
         />

       <br />
      <br />
      
			<input type="text"
       name=""
      placeholder="Enter Email"
      value={register.email}
      onChange={(e) =>
        setRegister({ ...register, email: e.target.value })
      }
      />
      <br />
      <br />

<input type="password"
       name=""
      placeholder="Enter Password"
      value={register.password}
      onChange={(e) =>
        setRegister({ ...register, password: e.target.value })
      }
      />
      <br />
      <br />

      <input type="number"
       name=""
      placeholder="Enter Phone NO."
      value={register.phone}
      onChange={(e) =>
        setRegister({ ...register, phone: e.target.value })
      }
      />
			<input type="submit" name="" value="Register" disabled={register.loading === true} />
		</form> 
        </div>
        </div>
    </div>
  );
};

export default Register;