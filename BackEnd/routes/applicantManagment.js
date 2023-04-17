const router = require("express").Router();
const db = require("../Database/DatabseConn");
//const bycrbt = require('bcrypt');


//Select All Applicant
router.get("/api/get-applicant", (req, res) => {
    const sqlGet = "SELECT * FROM users ORDER BY name";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}); 


//create Post API.
router.post("/api/post-applicant",(req,res) => {
    const{name,email,password,phone,status} = req.body;
    const sqlInsert = "INSERT INTO `users` (`name`, `email`, `password`,`phone`,`status`) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [name, email, password, phone, status], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});


router.delete("/api/remove-applicant/:id",(req,res) => {
    const{ id } = req.params;
    const sqlRemove = "DELETE FROM `users` WHERE id=? ";
    db.query(sqlRemove, [ id ], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

router.get("/api/get-applicant/:id", (req, res) => {
    const{ id } = req.params;
    const sqlGet = "SELECT * FROM users WHERE id=?";
    db.query(sqlGet, id , (error, result)=>{
        res.send(result);
    });
});

router.put("/api/update-applicant/:id", (req, res) => {
    const{ id } = req.params;
    const{name, email, phone, password, status} = req.body;
    const sqlUpdata = "UPDATE users SET name=? , email=? , phone=?, password=?, status=? WHERE id=? ";
    db.query(sqlUpdata, [name, email, phone, password, status, id] , (error, result)=>{
        res.send(result);
    });
});

module.exports = router;