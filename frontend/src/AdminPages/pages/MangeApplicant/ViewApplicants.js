import React, { useState , useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import "./Style/ViewApplicants.css"

const ViewApplicants = () => {
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setUser({ ...resp.data[0]}))
    },[id])

    return (
        <div style={{marginTop : "150px"}}>
            <div className='card'>
                <div className='card-header'>
                    <p>User Contact Details</p>
                </div>
                <div >
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br/><br/>

                    <strong>Name: </strong>
                    <span>{user.name}</span>
                    <br/><br/>

                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br/><br/>

                    <strong>Phone: </strong>
                    <span>{user.phone}</span>
                    <br/><br/>
                    <strong>Status: </strong>
                    <span>{user.status}</span>
                    <br/><br/>
                    <Link to={"/"} >
                        <div className='btn btn-view'>Go Back</div>
                    </Link>    
                    <Link to={`/updateuser/${id}`} >
                        <div className='btn btn-edit'>Update</div>
                    </Link>                
                </div>
            </div>
        </div>
    );
};

export default ViewApplicants;