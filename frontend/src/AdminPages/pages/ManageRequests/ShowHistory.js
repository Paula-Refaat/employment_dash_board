import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';

const ShowHistory = () => {
    const[data, setData] = useState([]);
    
    const loadData = async () => {
        const respons = await axios.get("http://localhost:5000/api/get-history-requests");
        setData(respons.data);
    };
    
    useEffect(() =>{
        loadData();
    },[]);

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
                                
                                <button className='btn btn-delete' onClick={() => deleteRequest(item.ID)}>Delete</button>
                                <Link to={`/history-requests-applicant/${item.user_ID}`}>
                                <button className='btn btn-edit'>Show requests user</button>
                                </Link>
                            </tr>
                        );
                    })};
                       <Link to={"/requests"} >
                        <div className='btn btn-view'>Go Back</div>
                        </Link>  
                </tbody>
            </table>
        </div>
    );
};

export default ShowHistory;