const router = require("express").Router();
const db = require ("../Database/DatabseConn");



//SelectAll From Qulaifications
router.get("/api/get-qualifications", (req, res) => {
    const sqlGet = "SELECT * FROM qualification";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}); 

router.post("/api/post-qualifications",(req,res) => {
    const{description} = req.body;
    const sqlInsert = "INSERT INTO `qualification` (`description`) VALUES (?)";
    db.query(sqlInsert, [description], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

router.delete("/api/remove-qualification/:id",(req,res) => {
    const{ id } = req.params;
    const sqlRemove = "DELETE FROM `qualification` WHERE id=? ";
    db.query(sqlRemove, [ id ], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});
router.get("/api/get-qualification/:id", (req, res) => {
    const{ id } = req.params;
    const sqlGet = "SELECT * FROM qualification WHERE id=?";
    db.query(sqlGet, id , (error, result)=>{
        res.send(result);
    });
});

router.put("/api/updatqualification/:id", (req, res) => {
    const{ id } = req.params;
    const{description} = req.body;
    const sqlUpdata = "UPDATE qualification SET description=? WHERE id=? ";
    db.query(sqlUpdata, [description, id] , (error, result)=>{
        res.send(result);
    });
});








// router.get("/",(req,res) => {

//     const sqlInsert = "INSERT INTO `qualification` (`description`) VALUES ('backend 5 years')";
//     db.query(sqlInsert, (err,result)=>{
//         console.log("error: ",err);
//         console.log("Results: ",result);
//         res.send("Hello Express");
//     })
// });
module.exports = router;