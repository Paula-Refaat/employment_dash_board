const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const user = require('./routes/applicantManagment');
const qualification = require('./routes/qualifucationsManagment');
const job = require('./routes/jobManagment');
const requst = require ('./routes/requsestManagment');
const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


    //create Get API.
    app.use(user);
    app.use(qualification);
    app.use(job);
    app.use(requst);
    



    // Connect with Server
app.listen(port, () => {
    console.log("server is running on port 5000");
 });