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
        const deleteQualification = (id) => {
            if(window.confirm("Are You Sure That Wanted Delete that ?")){
                axios.delete(`http://localhost:5000/api/remove-qualification/${id}`);
                toast.success("Qualification Deleted Successfully");
                setTimeout( () => loadData(), 500);
            }
        }
        

    return (
        <div style={{marginTop: "150px"}}>
             <Link to={"/addqualification"}>
                <button className='btn btn-contact'>Add New Qualification</button>
            </Link>
                    {data.map((item , index) =>{
                        return(
                            <div className="main" key={item.id}>
                                <div className="videos_container">
                                    <p>{item.description}</p>
                                </div>
                                <Link to={`/updatequalification/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteQualification(item.id)}>Delete</button>
                            </div>    
                            
                        );
                    })};
        </div>
    );
};

export default Qualifications;