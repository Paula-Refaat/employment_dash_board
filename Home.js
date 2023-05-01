import React, { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';




 const Home = () => {
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
 .get("http://localhost:4000/jobs",{
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

    return(
        <div className='home-container p-5'>

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
      <Form onSubmit={searchJobs}>
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
      </Form>
          
              {/*LIST JOBS*/ }
            <div className="row">
              {
                jobs.results.map(job => (
                  <div className="col-3 card-job-container" key={job.id}>
                  <JobCard 
                  position={job.position} 
                  description={job.description}
                  id={job.id}
                   />
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

 export default Home;