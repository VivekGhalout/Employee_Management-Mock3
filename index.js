const express = require('express');
const { connection } = require('./config/db')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const { authentication } = require("./middleware/authmiddleware")
const{userRouter} = require("./routes/user.routes");
const { employeeRouter } = require('./routes/employee.routes');

const app = express();
const PORT = 8080
app.use(express.json());
app.use(cors());

app.use("/", userRouter);

app.use("/employees", authentication, employeeRouter);

app.listen(PORT, async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error while connecting to DB");
        console.log(error);
    }
    console.log(`Listening on the port ${PORT}`);
})