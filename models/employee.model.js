const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type : String, required : true},
    department : {type : String, required : true},
    salary : {type : Number, required : true},
    emp_id : {type : String, required : true}
})

const Employeemodel = mongoose.model("employee", employeeSchema)

module.exports = {Employeemodel}