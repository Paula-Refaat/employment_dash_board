const router = require("express").Router();
const db = require ("../Database/DatabseConn");


router.get("/api/get-requests", (req, res) => {
    const sqlGet = "SELECT * FROM job_requests";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}); 


router.get("/api/get-request/:ID", (req, res) => {
    const{ id } = req.params;
    const sqlGet = "SELECT * FROM job_requests WHERE ID=?";
    db.query(sqlGet, id , (error, result)=>{
        res.send(result);
    });
});


router.put("/api/reject/:ID", (req, res) => {
    const{ ID } = req.params;
     const{status} = req.body;
    const sqlUpdata = "UPDATE job_requests SET status='Rejected' WHERE ID=? ";
    db.query(sqlUpdata, [status,ID] , (error, result)=>{
        res.send(result);
    });
});


router.put("/api/accept/:ID", (req, res) => {
    const{ ID } = req.params;
     const{status} = req.body;
    const sqlUpdata = "UPDATE job_requests SET status='Accepted' WHERE ID=8 ";
    db.query(sqlUpdata, [status,ID] , (error, result)=>{
        res.send(result);
    });
});


router.delete("/api/remove-request/:ID",(req,res) => {
    const{ ID } = req.params;
    const sqlRemove = "DELETE FROM `job_requests` WHERE ID=? ";
    db.query(sqlRemove, [ ID ], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});





// router.get("/",(req,res) => {

//     const sqlInsert = "INSERT INTO `job_requests` (`job_ID`, `user_ID`, `status`) VALUES ('7','202002','Accepted')";
//     db.query(sqlInsert, (err,result)=>{
//         console.log("error: ",err);
//         console.log("Results: ",result);
//         res.send("Hello Express");
//     })
// });

module.exports = router;