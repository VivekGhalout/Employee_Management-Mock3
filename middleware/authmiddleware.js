require('dotenv').config();

var jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token)
    if(!token){
        return res.send("Please Login First")
    }

    jwt.verify(token, process.env.MY_SECRET, function(err, decoded){
        const {employeeID} = decoded
        req.employeeID = employeeID;
        if(decoded) {
            next();
        } else {
            res.status(400).send("Please Login First");
        }
    })
}

module.exports = {authentication}