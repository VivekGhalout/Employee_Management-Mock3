const express = require("express");

const { Employeemodel } = require("../models/employee.model");

const employeeRouter = express.Router();

employeeRouter.get("/", async (req, res) => {
    const query = req.query
    const employee = await Employeemodel.find(query)
    res.status(200).send(employee)
})

employeeRouter.post("/create", async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body
    const emp_id = req.employeeID;
    const employee = new Employeemodel({
        firstName,
        lastName,
        email,
        department,
        salary,
        emp_id
    })
    await employee.save();
    res.status(201).send({ "msg": "Employee Details Added" })
})

employeeRouter.put("/edit/:_id", async (req, res) => {
    const { _id } = req.params
    const employeeID = req.employeeID
    const employee = await Employeemodel.findOne({ _id: _id })
    const emp_id = employee.emp_id

    if (emp_id === employeeID) {
        const { firstName, lastName, email, department, salary } = req.body;
        try {
            const updatedDetails = await Employeemodel.findByIdAndUpdate(_id, {
                firstName,
                lastName,
                email,
                department,
                salary,
                emp_id
            })

            if (!updatedDetails) {
                res.status(404).send("Employee not found")
            } else {
                res.status(200).send("Employee Details Updated")
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.send("You are not Authorised")
    }
})

employeeRouter.delete("/delete/:_id", async (req, res) => {
    const { _id } = req.params
    const employeeID = req.employeeID
    const employee = await Employeemodel.findOne({ _id: _id })
    const emp_id = employee.emp_id

    if (emp_id === employeeID) {
        await Employeemodel.findOneAndDelete({ _id: _id })
        res.status(200).send("Employee Details Deleted Successfully")
    } else {
        res.send("You are not Authorised")
    }
})

module.exports = {employeeRouter}