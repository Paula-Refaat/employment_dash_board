const router = require("express").Router();
const db = require("../Database/DatabseConn");

//Save New Job
router.post("/api/post-job",(req,res) => {
    const{Position,Description,Offer,MaxCandidateNumber,Qualification} = req.body;
    const sqlInsert = "INSERT INTO `job` (`Position`, `Description`, `Offer`,`MaxCandidateNumber`,`Qualification`) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [Position, Description, Offer, MaxCandidateNumber, Qualification], (error, result)=>{
        if(error){
            console.log(error);
        }else{
            res.send("Job Send Sccussfully");
        }
    });
});

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

//Select Spacific Job
router.get("/api/get-job/:ID", (req, res) => {
    const{ ID } = req.params;
    const sqlGet = "SELECT * FROM job WHERE ID=?";
    db.query(sqlGet, ID , (error, result)=>{
        res.send(result);
    });
});

// Update Job
router.put("/api/update-job/:ID", (req, res) => {
    const{ ID } = req.params;
    const{Position, Description, Offer, MaxCandidateNumber, Qualification} = req.body;
    const sqlUpdata = "UPDATE job SET Position=? , Description=? , Offer=?, MaxCandidateNumber=?, Qualification=? WHERE ID=? ";
    db.query(sqlUpdata, [Position, Description, Offer, MaxCandidateNumber, Qualification, ID] , (error, result)=>{
        res.send("Job Updeted Successfully");
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
        else{
        res.send("Job Deleted Successfully");

        }
    });
});


// User LIST, SEARCH --> [ADMIN, USER]
router.get("", async (req, res) => {

    const query = util.promisify(db.query).bind(db);
    let search = ""
    if (req.query.search) {
        search = `where Position LIKE '%${req.query.search}%'or Description LIKE '%${req.query.search}%'`;
    };
    const job = await query(`select * from job ${search}`)

    res.status(200).json(job);
});


//User Save Search in Database
router.post("/search", (req, res) => {
    const{user_ID,key_word} = req.body;
    const sqlInsert = "INSERT INTO `user_search` (`user_ID`,`key_word`) VALUES (?,?)";
   db.query(sqlInsert, [user_ID,key_word] , (error, result)=>{
       res.send("Word Saved Successfully");
   });
});

// User Get all Key-Words
router.get("/search-history/:user_ID", (req, res) => {
    const{ user_ID } = req.params;
    const sqlGet = "SELECT key_word FROM `user_search` WHERE user_ID=?";
    db.query(sqlGet, user_ID , (error, result)=>{
        res.send(result);
    });
});

// User Delete One Search
router.delete("/delete-one-search/:id",(req,res) => {
    const{ id } = req.params;
    const sqlRemove = "DELETE FROM `user_search` WHERE id=? ";
    db.query(sqlRemove, [ id ], (error, result)=>{
        if(error){
            console.log(error);
        }
        else{
        res.send("Search Deleted Successfully");
        }
    });
});

// User Clear All Search
router.delete("/clearAll/:user_ID",(req,res) => {
    const{ user_ID } = req.params;
    const sqlRemove = "DELETE FROM `user_search` WHERE user_ID=? ";
    db.query(sqlRemove, [ user_ID ], (error, result)=>{
        if(error){
            console.log(error);
        }
        else{
        res.send("Search Deleted Successfully");
        }
    });
});





module.exports = router;