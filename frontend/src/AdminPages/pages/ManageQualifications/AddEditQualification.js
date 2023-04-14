import React, { useState , useEffect } from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import './Style/AddEditQualification.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    description : "",
};

const AddEditQualification = () => {
    const [state, setState] = useState(initialState);
    const {description} = state;
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get-qualification/${id}`).then((resp) => setState({ ...resp.data[0]}))
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!description){
            toast.error("Please Provide value into each input field");
        }else{

            // Add User
            if(!id){
                axios.post("http://localhost:5000/api/post-qualifications", {
                    description,
                }).then(()=>{
                    setState({ description:""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added Successfully");

                // Update User
            } else{
                axios.put(`http://localhost:5000/api/updatqualification/${id}`, {
                    description,
                }).then(()=>{
                    setState({ description:""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully");
            }

            setTimeout(() => navigate("/qualifications"), 500);
        }
    };

    const handleInputChange = (e) =>{
       const {name, value} =  e.target;
       setState({...state, [name]: value});
    };

    return (
        <div className='container'>
        <div style={{marginTop : "140px"}}>
            <form 
                onSubmit = {handleSubmit} 
            >
                <div class="mb-3 col-lg-12 col-md-12 col-12">
                    <h3 style={{color : "red", 
                    alignContent : 'center'
                    }}>Add / Update Qualification</h3>
                
                    <textarea name="description" value={description} onChange={handleInputChange} className="form-control" id="" cols="30" rows="5"></textarea>
                </div>
                    
                <input type="submit" value={id ? "Update" : "save"}/>
                <Link to={"/qualifications"}>
                <input type="button" value={"Go Back"}/>
            </Link>
             </form>
            </div>
            </div>
    );
};

export default AddEditQualification;