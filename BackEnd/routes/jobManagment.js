const router = require("express").Router();
const db = require("../Database/DatabseConn");


//SelectAll From Jobs
router.get("/api/get-jobs", (req, res) => {
    const sqlGet = "SELECT * FROM job";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});


//create Post API.
router.post("/api/post-job",(req,res) => {
    const{Position,Description,Offer,MaxCandidateNumber,Qualification} = req.body;
    const sqlInsert = "INSERT INTO `job` (`Position`, `Description`, `Offer`,`MaxCandidateNumber`,`Qualification`) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [Position, Description, Offer, MaxCandidateNumber, Qualification], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});


router.delete("/api/remove-job/:ID",(req,res) => {
    const{ ID } = req.params;
    const sqlRemove = "DELETE FROM `job` WHERE ID=? ";
    db.query(sqlRemove, [ ID ], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

router.get("/api/get-job/:ID", (req, res) => {
    const{ ID } = req.params;
    const sqlGet = "SELECT * FROM job WHERE ID=?";
    db.query(sqlGet, ID , (error, result)=>{
        res.send(result);
    });
});

router.put("/api/updatejob/:ID", (req, res) => {
    const{ ID } = req.params;
    const{Position, Description, Offer, MaxCandidateNumber, Qualification} = req.body;
    const sqlUpdata = "UPDATE job SET Position=? , Description=? , Offer=?, MaxCandidateNumber=?, Qualification=? WHERE ID=? ";
    db.query(sqlUpdata, [Position, Description, Offer, MaxCandidateNumber, Qualification, ID] , (error, result)=>{
        res.send(result);
    });
});

// router.get("/",(req,res) => {
//     const sqlInsert = "INSERT INTO `job` (`Position`, `Description`, `Offer`, `MaxCandidateNumber`, `Qualification`) VALUES ('BackEnd','WebDeveloper','5000', '3', '5 years experence')";
//     db.query(sqlInsert, (err,result)=>{
//         console.log("error: ",err);
//         console.log("Results: ",result);
//         res.send("Hello Jobs");
//     })
// });
module.exports = router;