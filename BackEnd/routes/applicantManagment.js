const router = require("express").Router();
const db = require("../Database/DatabseConn");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const util = require("util"); 


//Select All Applicant
router.get("/api/get-applicant", (req, res) => {
    const sqlGet = "SELECT * FROM users ORDER BY name";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
}); 


//create Post API.
router.post("/api/post-applicant",async(req,res) => {
  const query = util.promisify(db.query).bind(db); 
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)  ,
    token: crypto.randomBytes(16).toString("hex"),
    phone: req.body.phone,
    status:req.body.status // JSON WEB TOKEN, CRYPTO -> RANDOM ENCRYPTION STANDARD
  };
  await query("insert into users set ? ", userData);
  delete userData.password;
  res.status(200).json(userData);
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