import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { getAuthUser } from "../../../helper/Storage";

const ShowJobHistory = () => {
  const auth = getAuthUser();

    const[data, setData] = useState([]);
    const loadData = async () => {
        
        const respons = await axios.get(`http://localhost:5000/search-history/${auth.id}`);
        setData(respons.data);
    };
    
    useEffect(() =>{
        loadData();
    },[]);

    const deleteOneSearch = (id) => {
        axios.delete(`http://localhost:5000/delete-one-search/${id}`);
        toast.success("This Search Deleted Successfully");
        setTimeout( () => loadData(), 500);
    }

    const clearAll = () => {
        axios.delete(`http://localhost:5000/clearAll/${auth.id}`);
        toast.success("All Search Cleared Successfully");
        setTimeout( () => loadData(), 500);
    }
    return (  
        
        <div style={{marginTop: "150px"}}>
        <button className='btn btn-delete' onClick={() => clearAll()}>Clear All</button>
        <table className='styled-table'>
            <thead>
                
                <tr>
                    <td style={{textAlign:"center"}}>NO.</td>
                    <td style={{textAlign:"center"}}>Search</td>
                    <td style={{textAlign:"center"}}>Actions</td>
                </tr>
            </thead>            
            <tbody>
               {data.map((item , index) =>{
                    return(
                        <tr key={item.id}>
                            <th scope='row'>{index+1}</th>        
                            <td>{item.key_word}</td>
                            <button className='btn btn-contact' onClick={() => deleteOneSearch(item.id)}>Delete</button>

                        </tr>
                    );
                })};
            </tbody>
        </table>
    </div>
    );
};

export default ShowJobHistory;