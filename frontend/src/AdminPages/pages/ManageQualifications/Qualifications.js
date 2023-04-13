import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Style/Qualifications.css';
import {toast} from 'react-toastify';
import axios from 'axios';


const Qualifications = () => {
    const[data, setData] = useState([]);
    
const loadData = async () => {
    const respons = await axios.get("http://localhost:5000/api/get-qualifications");
    setData(respons.data);
};

useEffect(() =>{
    loadData();
},[]);

        // DELETE
        const deleteUser = (id) => {
            if(window.confirm("Are You Sure That Wanted Delete that ?")){
                axios.delete(`http://localhost:5000/api/remove-qualification/${id}`);
                toast.success("content Deleted Successfully");
                setTimeout( () => loadData(), 500);
            }
        }
        

    return (
        <div style={{marginTop: "150px"}}>
             <Link to={"/addqualification"}>
                <button className='btn btn-contact'>Add New Qualification</button>
            </Link>
            <table className='styled-table'>
                {/* <thead>
                    <tr>
                        <td style={{textAlign:"center"}}>NO.</td>
                        <td style={{textAlign:"center"}}>Name</td>
                        <td style={{textAlign:"center"}}>Email</td>
                        <td style={{textAlign:"center"}}>Phone</td>
                        <td style={{textAlign:"center"}}>Status</td>
                        <td style={{textAlign:"center"}}>Action</td>
                    </tr>
                </thead> */}
                <tbody>
                    {data.map((item , index) =>{
                        return(
                            <tr key={item.id}>
                                <th scope='row'>{index+1}</th>
                                <td>{item.description}</td>
                                <br></br> <br></br>
                                <br></br> <br></br>  
                                <br></br> <br></br>
                                <br></br> <br></br> 
                                  
                                {/* <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.status}</td> */}
                                {/* <td> */}
                                <Link to={`/updatequalification/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteUser(item.id)}>Delete</button>
                                    {/* <Link to={`/viewuser/${item.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td> */}

                            </tr>
                        );
                    })};
                </tbody>
            </table>

        </div>
    );
};

export default Qualifications;