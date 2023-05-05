import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';


const ShowRequests = () => {

    const[data, setData] = useState([]);
    
    const loadData = async () => {
        const respons = await axios.get("http://localhost:5000/api/get-requests");
        setData(respons.data);
    };
    
    useEffect(() =>{
        loadData();
    },[]);
    const acceptRequest = (ID) => {
            axios.put(`http://localhost:5000/api/accept-request/${ID}`);
            toast.success("Request Accepted Successfully");
            setTimeout( () => loadData(), 500);
    }

    const rejectRequest = (ID) => {
            axios.put(`http://localhost:5000/api/reject-request/${ID}`);
            toast.success("Request Rejected Successfully");
            setTimeout( () => loadData(), 500);
    }

    const deleteRequest = (ID) => {
        
            axios.delete(`http://localhost:5000/api/remove-request/${ID}`);
            toast.success("Request Deleted Successfully");
            setTimeout( () => loadData(), 500);
        
    }

    return (
        
        <div style={{marginTop: "150px"}}>

            <table className='styled-table'>
                <thead>
                    <tr>
                        <td style={{textAlign:"center"}}>NO.</td>
                        <td style={{textAlign:"center"}}>Job ID</td>
                        <td style={{textAlign:"center"}}>User ID</td>
                        <td style={{textAlign:"center"}}>Status</td>
                        <td style={{textAlign:"center"}}>requested_Date</td>
                        <td style={{textAlign:"center"}}>Actions</td>
                    </tr>

                </thead>
                <tbody>
                   {data.map((item , index) =>{
                        return(
                            <tr key={item.ID}>
                                <th scope='row'>{index+1}</th>
                                <td>{item.job_ID}</td>
                                <td>{item.user_ID}</td>
                                <td>{item.status}</td>
                                <td>{item.requested_Date}</td>

                                <button className='btn btn-edit' onClick={() => acceptRequest(item.ID)}>Accept</button>
                                <button className='btn btn-delete' onClick={() => rejectRequest(item.ID)}>Reject</button>
                                <button className='btn btn-delete' onClick={() => deleteRequest(item.ID)}>Delete</button>
                                {/* <Link to={`/history-requests-applicant/${item.user_ID}`}>
                                <button className='btn btn-edit'>Show requests user</button>
                                </Link> */}
                            </tr>
                        );
                    })};
                        <br/>
                        <Link to={"/history-requests"} >
                        <div className='btn btn-edit'  >Show History</div>
                        </Link>  
                      
                </tbody>
            </table>
        </div>
       
    );


};


export default ShowRequests;