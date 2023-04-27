import React, {useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Shared/Header';

const ApplicantHistory = () => {

    //Get Status of Request 

    const[data, setData] = useState([]);
    const {user_ID} = useParams();
    const loadData = async () => {
        
        const respons = await axios.get(`http://localhost:5000/api/get-applicant-requests/${user_ID}`);
        setData(respons.data);
    };
    
    useEffect(() =>{
        loadData();
    },[]);


    // Get Applicant name
    const [userdata, setuserdata] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get-applicant/${user_ID}`).then((resp) => setuserdata({ ...resp.data[0]}))
    },[user_ID])


    return (
        <div style={{marginTop: "150px"}}>
            <Header/>
        <table className='styled-table'>
            <thead>
                    <div  style={{fontSize:"20px",color:"red",margin:"20px",}}>
                    <span>Name : </span>
                    <span style={{color:"black"}}>{userdata.name}</span>
                    </div>
               
                <tr>
                    <td style={{textAlign:"center"}}>NO.</td>
                    <td style={{textAlign:"center"}}>Job ID</td>
                    <td style={{textAlign:"center"}}>Status Request</td>
                    <td style={{textAlign:"center"}}>requested_Date</td>
                    {/* <td style={{textAlign:"center"}}>Actions</td> */}
                </tr>

            </thead>
            
            <tbody>
               {data.map((item , index) =>{
                    return(
                        <tr key={item.ID}>
                            <th scope='row'>{index+1}</th>        
                            <td>{item.job_ID}</td>
                            <td>{item.status}</td>
                            <td>{item.requested_Date}</td>
                   
                            {/* <button className='btn btn-delete' onClick={() => deleteRequest(item.ID)}>Delete</button>
                            <Link to={`/history-requests-applicant/${item.user_ID}`}>
                            <button className='btn btn-edit'>Show requests user</button>
                            </Link> */}
                        </tr>
                    );
                })};
                   <Link to={"/history-requests"} >
                    <div className='btn btn-view'>Go Back</div>
                    </Link>  
            </tbody>
        </table>
    </div>
    );
};

export default ApplicantHistory;