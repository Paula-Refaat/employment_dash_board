import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';


const Jobs = () => {
    const[data, setData] = useState([]);
    const[qualification, setqualification] = useState([]);
    
    const loadData = async () => {
        const respons = await axios.get("http://localhost:5000/api/get-jobs")
        .then(res=>{
            axios.get("http://localhost:5000/api/get-jobs/qs")
            .then(result=>{setqualification(result.data)})
            setData(res.data);
        })
        
        
    };

    useEffect(() =>{
        loadData();
    },[]);

    const deleteJob = (ID) => {
            axios.delete(`http://localhost:5000/api/remove-job/${ID}`);
            toast.success("Job Deleted Successfully");
            setTimeout( () => loadData(), 500); 
    }

////////////////////////////////////////////////////////////
    // AddRequest ==> very important

////////////////////////////////////////////////////////////


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
                                <td>
                                {qualification.map((key)=>{
                                    if(item.ID===key.ID)
                                    {
                                        return(
                                            <>
                                            - {key.Qualifications}<br/><br/>
                                            </>

                                    )
                                    }
                                    

                                })}</td>
                                


                                <td>
                                <Link to={`/updatejob/${item.ID}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteJob(item.ID)}>Delete</button>
                                    {/* <button className='btn btn-delete' onClick={() => sendrequest(item.ID,auth.id)}>send Request</button> */}
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