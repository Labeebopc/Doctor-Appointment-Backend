const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/userModel.js")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../helpers/jwt-token.js")

//@disc User Registration
//@api POST /user_registration
//@access Private
exports.userRegistration = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {

            return res.status(400).json({ status: false, message: "User Already Exists" })
        }
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await User.create({ name, email, password: hashedPassword })

            return res.status(201).json({ status: true, user, message: "Account Successfully Created" })
        }

    } catch (error) {
        return res.status(500).json({ status: false, error: error.message })
    }
})


//@disc User Login
//@api POST /user_login
//@access Public
exports.userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ status: false, message: "Please provide email and password" })
    }

    try {

        const existingUser = await User.findOne({ email }).select("+password")

        if (!existingUser) {
            return res.status(404).json({ status: false, message: "Invalid Credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ status: false, message: "Invalid Credentials" })
        }

        // jwt token
        const token = await generateToken({ id: existingUser._id }, "1d")

        return res.status(200).json({ status: true, existingUser, token, message: "Successfully Logged in" })


    } catch (error) {

        return res.status(500).json({ status: false, message: error.message })

    }
});


//@disc Get User Data
//@api POST /get_user_data
//@access Public
exports.getUserData = asyncHandler(async (req, res) => {
    const { id } = req.user
    try {

        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" })
        }
        return res.status(200).json({ status: true, user: { id: user._id, name: user.name, email: user.email } })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Auth error" })
    }
})