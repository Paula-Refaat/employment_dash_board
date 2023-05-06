const router = require("express").Router();
const db = require ("../Database/DatabseConn");



// Select All Requests
router.get("/api/get-requests", (req, res) => {
    const sqlGet = "SELECT * FROM job_requests WHERE status='Pending'";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}); 


// Select History Requests Of Spacific Applicant
router.get("/api/get-applicant-requests/:user_ID", (req, res) => {
    const{ user_ID } = req.params;
    const sqlGet = "SELECT distinct job_ID , user_ID, status, requested_Date FROM job_requests WHERE user_ID=?";
    db.query(sqlGet, user_ID , (error, result)=>{
        res.send(result);
    });
});

// Select History Requests
router.get("/api/get-history-requests", (req, res) => {
    const sqlGet = "SELECT * FROM job_requests WHERE status='Accepted' or status = 'Rejected'";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}); 

// Accept a Request
router.put("/api/accept-request/:ID", (req, res) => {
     const{ ID } = req.params;
    const sqlUpdata = "UPDATE `job_requests` SET `status`='Accepted' WHERE ID=?";
    db.query(sqlUpdata, [ID] , (error, result)=>{
        res.send(result);
    });
});

// Reject a Request
router.put("/api/reject-request/:ID", (req, res) => {
    const{ ID } = req.params;
   const sqlUpdata = "UPDATE `job_requests` SET `status`='Rejected' WHERE ID=?";
   db.query(sqlUpdata, [ID] , (error, result)=>{
    res.send(result);
});
});

// delete Request
router.delete("/api/remove-request/:ID",(req,res) => {
    const{ ID } = req.params;
    const sqlRemove = "DELETE FROM `job_requests` WHERE ID=? ";
    db.query(sqlRemove, [ ID ], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});


////////////////////////////////////////////////////////////
// User AddRequest ==> very important
router.post("/api/add-request", (req, res) => {
    const{job_ID, user_ID} = req.body;
    const sqlInsert = "INSERT INTO `job_requests` (`job_ID`, `user_ID`) VALUES (?, ?)";
   db.query(sqlInsert, [job_ID, user_ID] , (error, result)=>{
    //    res.send("Job Send Sccussfully");
    if(error){
        console.log(error);
    }
       else{
       const ist="INSERT INTO `user_job`( `job_ID`, `user_ID`) VALUES (?,?)";
       db.query(ist,[job_ID, user_ID], (error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send(result)
        }
       })
    }
   });
});
////////////////////////////////////////////////////////////

module.exports = router;