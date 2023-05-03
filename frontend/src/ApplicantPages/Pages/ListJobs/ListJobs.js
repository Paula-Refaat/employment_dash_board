// import React, {useState,useEffect} from 'react';
// import {Link} from 'react-router-dom';
// import {toast} from 'react-toastify';
// // import image from '../AdminPages/pages/Home/images/ApplyNow.jpg';
// import axios from 'axios';

// import { getAuthUser } from "../../../helper/Storage";
// import  './Style/ListJob.css';

// const ListJobs = () => {
//     const auth = getAuthUser();
//     const[data, setData] = useState([]);
    
//     const loadData = async () => {
//         const respons = await axios.get("http://localhost:5000/api/get-jobs");
//         setData(respons.data);
//     };


//     useEffect(() =>{
//         loadData();
//     },[]);


//     return (
        
//         // <div style={{
//         //     width:'2000px',
//         //     height:'900px',
//         //     backgroundRepeat:'no-repeat',
//         //     backgroundSize:'cover',
//         //     backgroundAttachment:'fixed',
//         //     backgroundPosition:'center',
//         //     backgroundImage:`url(${image})`
//         // }}>



    
// <div style={{marginTop: "130px"}}>


// <h1>Search Here</h1>
//     <form action='/search' >
//         <input type='search' name='name'  placeholder='Search Job' />
//         <input type='submit' value="Search" />
        
        
//     </form>
//     <div style={{marginTop:"-380px"}}>

    
// {data.map((item,index)=>{
//     return(
//     <div class="row align-items-center vh-100">
//                         <div class=" col-6 mx-auto">
//                         <div class=" xx card shadow border">
//                             <div class=" div card-body d-flex flex-column align-items-center">
//                             <h3 class="  card-text">{item.Position}</h3>
//                             <Link to={`/viewjob/${item.ID}`}>
//                             <span className='btn btn-view'>view</span>
//                             </Link>
//                             </div>
//                         </div>
//                         <br/>
//                     </div>
//             </div>
//     );
//     })}
// </div>
// </div>

//     );
// };

// export default ListJobs;
