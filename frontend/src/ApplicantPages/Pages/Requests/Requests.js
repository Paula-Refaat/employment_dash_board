import React, {useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { getAuthUser } from "../../../helper/Storage";


const Requests = () => {
  const auth = getAuthUser();

    const[data, setData] = useState([]);
    const {user_ID} = useParams();
    const loadData = async () => {
        
        const respons = await axios.get(`http://localhost:5000/api/get-applicant-requests/${auth.id}`);
        setData(respons.data);
    };
    
    useEffect(() =>{
        loadData();
    },[]);
    return (

        <div style={{marginTop: "150px"}}>
        
        <table className='styled-table'>
            <thead>
                <tr>
                    <td style={{textAlign:"center"}}>NO.</td>
                    <td style={{textAlign:"center"}}>Job Name</td>
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
                            <td>{item.Position}</td>
                            <td>{item.status}</td>
                            <td>{item.requested_Date}</td>
                   
                            {/* <button className='btn btn-delete' onClick={() => deleteRequest(item.ID)}>Delete</button>
                            <Link to={`/history-requests-applicant/${item.user_ID}`}>
                            <button className='btn btn-edit'>Show requests user</button>
                            </Link> */}
                        </tr>
                    );
                })};
                   <Link to={"/"} >
                    <div className='btn btn-view'>Go Back</div>
                    </Link>  
            </tbody>
        </table>
    </div>
    );
};

export default Requests;