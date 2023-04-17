const router = require("express").Router();
const db = require ("../Database/DatabseConn");



// Select All Requests
router.get("/api/get-requests", (req, res) => {
    const sqlGet = "SELECT * FROM job_requests WHERE status='Pending'";
    db.query(sqlGet, (error, result)=>{
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

module.exports = router;