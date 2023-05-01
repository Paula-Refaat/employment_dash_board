import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
//import JobCard from "../../../components/JobCard";
// import Form from 'react-bootstrap/Form';
import axios from 'axios';
 import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import  './Style/ListJob.css';


const ListSearchJobs = () => {
    const [jobs , setjobs] = useState ({
        loading : true ,
        results : [],
        error : null,
        reload : 0
       });
       const [search , setSearch] = useState ("");

       useEffect( () => {
        setjobs({...jobs, loading : true});
       axios 
       .get("http://localhost:5000/api/get-jobs",{
        params:{
          search: search,
        },
       })
       .then(resp => {
        console.log(resp);
        setjobs({...jobs, results : resp.data, loading : false , err : null});
      
       })
       .catch(err => {
        setjobs({...jobs, loading : false, err : "something went wrong"});
      
       });
      },
      [jobs.reload]
      );

      const searchJobs = (e) => {
        e.preventDefault();
        setjobs({...jobs, reload: jobs.reload +1 })
      
      }


    return (


        <div style={{marginTop: "130px"}}>


          {/*Loader */}
          {
            jobs.loading === true && (
              <div className="text-center">
                  <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                   </Spinner>
              </div> 
            )
          }
          
           {/*List Jobs */}
          {
            jobs.loading === false && jobs.err == null && (
              <>
            {/*Filter */}
        <form onSubmit={searchJobs} >
        <input type='text'
         name='name'
        placeholder='Search Job'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
         />
        <button className='btn btn-edit'> Search </button>
        </form>
        
      {/* <form onSubmit={searchJobs}>
      <Form.Group className="mb-3 d-flex">
        <Form.Control 
        type="text"
        placeholder="Search for a job"
        className="rounded-0"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button className='btn btn-dark rounded-0'> Search </button>
      </Form.Group>
      </form> */}


            {/* <div className="col-3 card-job-container" key={job.ID}>
                  <p>
                  position={job.Position} 
                  description={job.Description}
                  id={job.ID}
                  </p>
                  </div> */}


              {/*LIST JOBS*/ }
            <div style={{marginTop:"-380px"}}>
              {
                jobs.results.map(job => (
                    <div class="row align-items-center vh-100" key={job.ID}>
                    <div class=" col-6 mx-auto">
                    <div class=" xx card shadow border">
                        <div class=" div card-body d-flex flex-column align-items-center">
                        <h3 class="  card-text">{job.Position}</h3>
                        <Link to={`/viewjob/${job.ID}`}>
                            <span className='btn btn-view'>view</span>
                            </Link>
                        </div>
                    </div>
                    <br/>
                </div>
        </div>
                ))
              }
               
                
               
            </div>
              </>
            )
          }
          
 {/*Error Handling    السيرفر بيقع لما بغير الباث لازم نعمل رن من الأول*/}

          {
            jobs.loading === false && jobs.err != null && (     
              <Alert variant="danger" className='p-2'>
            {jobs.err}
               </Alert>
            )}

           {
            jobs.loading === false && jobs.err == null && jobs.results.length === 0 && (     
              <Alert variant="info" className='p-2'>
                  No Jobs Found Related to Your Search
               </Alert>
            )}
        </div> 
    );
 };

export default ListSearchJobs;