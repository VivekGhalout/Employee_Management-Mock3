const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const { Usermodel } = require('../models/user.model');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const address = req.socket.localAddress;
    const { email, password, confirm_password } = req.body
    const user = await Usermodel.findOne({ email })
    if (user) {
        res.send("User already exist")
    }
    else if (password !== confirm_password) {
        res.send("Password not mached")
    }
    else {
        const hash_confg_pass = bcrypt.hashSync(confirm_password, 6);
        const hash_pass = bcrypt.hashSync(password, 6);
        const new_user = new Usermodel({
            email,
            password: hash_pass,
            confirm_password: hash_confg_pass,
        })
        await new_user.save();
        res.status(201).send("Account Created")
    }

})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email })
    if (!user) {
        res.status(204).send("Please Login First")
    }
    const hash = user.password;
    const corr_pasword = bcrypt.compareSync(password, hash);
    if (corr_pasword) {
        const token = jwt.sign({ employeeID: user._id }, process.env.MY_SECRET);
        res.send({ "msg": token })
    } else {
        res.status(400).send("Wrong Password");
    }
})

module.exports = { userRouter }