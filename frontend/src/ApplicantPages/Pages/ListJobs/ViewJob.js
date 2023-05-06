import React, { useState , useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { getAuthUser } from "../../../helper/Storage";


const ViewJob = () => {
    const auth = getAuthUser();
    const sendrequest = (job_ID,user_ID) => {
        axios.post("http://localhost:5000/api/add-request",{
            job_ID,
            user_ID,
        });
        toast.success("request added Successfully");
        // setTimeout( () => loadData(), 500); 
}

const[data, setData] = useState([]);
const[qualification, setqualification] = useState([]);
const {ID} = useParams();
const loadData = async () => {
    const respons = await axios.get(`http://localhost:5000/api/get-job/${ID}`)
    .then(res=>{
        axios.get("http://localhost:5000/api/get-jobs/qs")
        .then(result=>{setqualification(result.data)})
        setData(res.data);
    })
};

useEffect(() =>{
    loadData();
},[]);

    return (    

    <div style={{marginTop : "150px"}}>
    <div className='card'>
        <div className='card-header'>
            <p>Job  Details</p>
        </div>
        <div>
        <div>
            {
                data.map((job)=>{
                    return(
                        <h2 style={{color:"red"}}>{job.Position}</h2>
                    )
                })
            }
            </div>
            {data.map((item , index) =>{
                return(
                    <div key={item.ID}>
                    <h3 style={{fontSize:"20px",fontFamily:"bold"}}>Description: </h3>
                    <span style={{fontSize:"20px",fontFamily:"bold"}}>{item.Description}</span>
                    
                     <br/><br/> 
                    <h3 style={{fontSize:"20px",fontFamily:"bold"}}>Qualification: </h3>
                                {qualification.map((key,index)=>{
                                    if(item.ID===key.ID)
                                    {
                                        return(
                                            <>
                                            <p style={{fontSize:"20px",fontFamily:"bold"}}>{"- "+key.Qualifications + ""}</p>  
                                            </>
                                    )
                                    }
                                })}
                                   <br/>
                     <strong style={{fontSize:"20px",fontFamily:"bold"}}>Offer: </strong>
                    <span style={{fontSize:"20px",fontFamily:"bold"}}>{item.Offer}  </span>
                    <span style={{color:"red",fontFamily:"bold"}}>EGY</span>
                    <br/><br/>
                    <Link to={"/list-jobs"}>
                    <button className='btn btn-view'>Go Back</button>
                    </Link>
                    <button className='btn btn-edit' onClick={() => sendrequest(item.ID,auth.id)}>send Request</button>
                    </div>        
                        );
                    })};
        </div>
    </div>
</div>
 
    );
};

export default ViewJob;