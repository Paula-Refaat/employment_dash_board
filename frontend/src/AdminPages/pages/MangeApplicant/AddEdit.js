import React, { useState , useEffect } from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import './Style/AddEdit.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    name : "",
    email : "",
    password : "",
    phone : "",
    status : "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {name, email, password, phone, status} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    // select Spasific User
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({ ...resp.data[0]}))
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !password ||  !phone || !status ){
            toast.error("Please Provide value into each input field");

        }
        else if(!email.includes("@")){
            toast.error("Please Enter Valid Email");
        }
        else{

            // Add User
            if(!id){
                axios.post("http://localhost:5000/api/post", {
                    name,
                    email,
                    password,
                    phone,
                    status,
                }).then(()=>{
                    setState({ name:"", email:"", password:"", phone:"", status:""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added Successfully");

                // Update User
            } else{
                axios.put(`http://localhost:5000/api/updateuser/${id}`, {
                    name,
                    email,
                    password,
                    phone,
                    status,
                }).then(()=>{
                    setState({ name:"", email:"", password:"", phone:"",  status:""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully");
            }

            setTimeout(() => navigate("/"), 500);
        }
    };

    const handleInputChange = (e) =>{
       const {name, value} =  e.target;
       setState({...state, [name]: value});
    };

    return (
        <div style={{marginTop : "100px"}}>
            <form style={{
                margin : "auto",
                padding : "15px",
                maxWidth : "400px",
                alignContent : 'center'
            }}
                onSubmit = {handleSubmit} 
            >
                <label htmlFor='name'>Name</label>
                <input 
                type="text"
                id='name'
                name='name'
                placeholder='Your Name ...'
                value={name || ""}
                onChange={handleInputChange}
                />

                <label htmlFor='email'>Email</label>
                <input 
                type="text"
                id='email'
                name='email'
                placeholder='Your Email ...'
                value={email || ""}
                onChange={handleInputChange}
                />
                
                 <label htmlFor='password'>Password</label>
                <input 
                type="password"
                id='password'
                name='password'
                placeholder='Your password ...'
                value={password || ""}
                onChange={handleInputChange}
                />
                <label htmlFor='phone'>Phone</label>
                <input 
                type="number"
                id='phone'
                name='phone'
                placeholder='Your phone No ...'
                value={phone || ""}
                onChange={handleInputChange}
                />

            <label htmlFor='status'>Status</label>
                <input 
                type="text"
                id='status'
                name='status'
                placeholder='Your status  ...'
                value={status || ""}
                onChange={handleInputChange}
                />
                <input type="submit" value={id ? "Update" : "save"}/>
                <Link to={"/"}>
                    <input type="button" value={"Go Back"}/>
                </Link>
            </form>    
        </div>
    );

};
export default AddEdit;