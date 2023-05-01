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


//Save New Job
router.post("/api/post-job",(req,res) => {
    const{Position,Description,Offer,MaxCandidateNumber,Qualification} = req.body;
    const sqlInsert = "INSERT INTO `job` (`Position`, `Description`, `Offer`,`MaxCandidateNumber`,`Qualification`) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [Position, Description, Offer, MaxCandidateNumber, Qualification], (error, result)=>{
        if(error){
            console.log(error);
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


// Update Job
router.put("/api/update-job/:ID", (req, res) => {
    const{ ID } = req.params;
    const{Position, Description, Offer, MaxCandidateNumber, Qualification} = req.body;
    const sqlUpdata = "UPDATE job SET Position=? , Description=? , Offer=?, MaxCandidateNumber=?, Qualification=? WHERE ID=? ";
    db.query(sqlUpdata, [Position, Description, Offer, MaxCandidateNumber, Qualification, ID] , (error, result)=>{
        res.send(result);
    });
});



module.exports = router;