import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
// import "./Style/Applicant.css";
import {toast} from 'react-toastify';
import axios from 'axios';

const Jobs = () => {
    const[data, setData] = useState([]);
    
    const loadData = async () => {
        const respons = await axios.get("http://localhost:5000/api/get-jobs");
        setData(respons.data);
    };

    useEffect(() =>{
        loadData();
    },[]);
    const deleteJob = (ID) => {
        if(window.confirm("Are You Sure That Wanted Delete that ?")){
            axios.delete(`http://localhost:5000/api/remove-job/${ID}`);
            toast.success("content Deleted Successfully");
            setTimeout( () => loadData(), 500);
        }
    }

    return (
<div style={{marginTop: "150px"}}>

                <Link to={"/addjob"}>
                <button className='btn btn-contact'>Add New Job</button>
                </Link>

            <table className='styled-table'>
                <thead>
                    <tr>
                        <td style={{textAlign:"center"}}>NO.</td>
                        <td style={{textAlign:"center"}}>Position</td>
                        <td style={{textAlign:"center"}}>Description</td>
                        <td style={{textAlign:"center"}}>Offer</td>
                        <td style={{textAlign:"center"}}>MaxCandidateNumber</td>
                        <td style={{textAlign:"center"}}>Qualification</td>
                        <td style={{textAlign:"center"}}>Action</td>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item , index) =>{
                        return(
                            <tr key={item.ID}>
                                <th scope='row'>{index+1}</th>
                                <td>{item.Position}</td>
                                <td>{item.Description}</td>
                                <td>{item.Offer}</td>
                                <td>{item.MaxCandidateNumber}</td>
                                <td>{item.Qualification}</td>


                                <td>
                                <Link to={`/updatejob/${item.ID}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteJob(item.ID)}>Delete</button>
                                    {/* <Link to={`/viewuser/${item.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link> */}
                                </td>

                            </tr>
                        );
                    })};
                </tbody>
            </table>
        </div>
    );
};

export default Jobs;