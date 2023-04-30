import React, { useState , useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { getAuthUser } from "../../../helper/Storage";


const ViewJob = () => {
    const auth = getAuthUser();
    const [job, setJob] = useState({});

    const {ID} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get-job/${ID}`).then((resp) => setJob({ ...resp.data[0]}))
    },[ID])

    const sendrequest = (job_ID,user_ID) => {
        axios.post("http://localhost:5000/api/add-request",{
            job_ID,
            user_ID,
        });
        toast.success("request added Successfully");
        // setTimeout( () => loadData(), 500); 
}

    
    return (
        <div style={{marginTop : "150px"}}>
    
        <div className='card'>
            <div className='card-header'>
                <p>Job  Details</p>
            </div>
            <div >
                
                <h2 style={{color:"red"}}>{job.Position}</h2>
              

                <strong style={{fontSize:"20px",fontFamily:"bold"}}>Description: </strong>
                <span style={{fontSize:"20px",fontFamily:"bold"}}>{job.Description}</span>
                <br/><br/>

                <strong style={{fontSize:"20px",fontFamily:"bold"}}>Offer: </strong>
                <span style={{fontSize:"20px",fontFamily:"bold"}}>{job.Offer}  </span>
                <span style={{color:"red",fontFamily:"bold"}}>EGY</span>
                <br/><br/>
                <strong style={{fontSize:"20px",fontFamily:"bold"}}>Qualification: </strong>
                <span style={{fontSize:"20px",fontFamily:"bold"}}>{job.Qualification}</span>
                
                <br/><br/>
                <Link to={"/list-jobs"}>
                <button className='btn btn-view'>Go Back</button>
                </Link>
                <button className='btn btn-edit' onClick={() => sendrequest(job.ID,auth.id)}>send Request</button>

            </div>
        </div>
    </div>
    );
};

export default ViewJob;