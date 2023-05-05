const router = require("express").Router();
const db = require("../Database/DatabseConn");


//Select All From Jobs
router.get("/api/get-jobs", (req, res) => {
    let search = "";
    if(req.query.search){
        search = `WHERE Position LIKE '%${req.query.search}%'`
    }
    const sqlGet = `SELECT * FROM job ${search}`;
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});

//Select All From Jobs
router.get("/api/get-jobs/qs", (req, res) => {
    const sqlGet = "SELECT job.ID, qualification.description AS Qualifications FROM `job`join job_qualification on job.ID=job_qualification.job_ID JOIN qualification on qualification.id=job_qualification.qualification_ID";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});



//Save New Job
router.post("/api/post-job",(req,res) => {
    console.log(req.body);
    const{Position,Description,Offer,MaxCandidateNumber,Qualification} = req.body;
    const sqlInsert = "INSERT INTO `job` (`Position`, `Description`, `Offer`,`MaxCandidateNumber`,`Qualification`) VALUES (?, ?, ?, ?,'test')";
    db.query(sqlInsert, [Position, Description, Offer, MaxCandidateNumber, Qualification], (error, result)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("leader");
           const ist="INSERT INTO `job_qualification`( `job_ID`, `qualification_ID`) VALUES (?,?)";
           req.body.selected.forEach(
            (index)=>{ db.query(ist,[result.insertId,index],(res,err)=>{
                if(err){
                    console.log(err);
                }
               })}
           )
          

        }
    });
});


// Delete Job
router.delete("/api/remove-job/:ID",(req,res) => {
    const{ ID } = req.params;
    const sqlRemove = "DELETE FROM `job` WHERE ID=? ";
    db.query(sqlRemove, [ ID ], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});


//Select Spacific Job
router.get("/api/get-job/:ID", (req, res) => {
    const{ ID } = req.params;
    const sqlGet = "SELECT * FROM job WHERE ID=?";
    db.query(sqlGet, ID , (error, result)=>{
        res.send(result);
    });
});


// LIST, SEARCH --> [ADMIN, USER]

// LIST & SEARCH [ADMIN, USER]
// router.get("/search", async (req, res) => {
//     const query = util.promisify(db.query).bind(db);
//     let search = "";
//     if (req.query.search) {
//       // QUERY PARAMS
//       search = `where Position LIKE '%${req.query.search}%'`;
//     }
//     const movies = await query(`select * from movies ${search}`);
//     movies.map((movie) => {
//       movie.image_url = "http://" + req.hostname + ":4000/" + movie.image_url;
//     });
//     res.status(200).json(movies);
//   });


// LIST, SEARCH --> [ADMIN, USER]
router.get("", async (req, res) => {

    const query = util.promisify(db.query).bind(db);
    let search = ""
    if (req.query.search) {
        search = `where Position LIKE '%${req.query.search}%'or Description LIKE '%${req.query.search}%'`;
    };
    const job = await query(`select * from job ${search}`)

    res.status(200).json(job);
});

router.post("/search", (req, res) => {
    const{user_ID,key_word} = req.body;
    const sqlInsert = "INSERT INTO `user_search` (`user_ID`,`key_word`) VALUES (?,?)";
   db.query(sqlInsert, [user_ID,key_word] , (error, result)=>{
       res.send(result);
   });
});


// Update Job
router.put("/api/update-job/:ID", (req, res) => {
    const{ ID } = req.params;
    const{Position, Description, Offer, MaxCandidateNumber, Qualification} = req.body;
    const sqlUpdata = "UPDATE job SET Position=? , Description=? , Offer=?, MaxCandidateNumber=?, Qualification=? WHERE ID=? ";
    db.query(sqlUpdata, [Position, Description, Offer, MaxCandidateNumber, Qualification, ID] , (error, result)=>{
    const querydeleted="DELETE FROM `job_qualification` WHERE job_ID=?";
    db.query(querydeleted,ID,()=>{
        const ist="INSERT INTO `job_qualification`( `job_ID`, `qualification_ID`) VALUES (?,?)";
            req.body.selected.forEach(
             (index)=>{ db.query(ist,[ID,index],(res,err)=>{
                 if(err){
                     console.log(err);
                 }
                })}
            )

    });
            
        res.send(result);
    });
});



module.exports = router;