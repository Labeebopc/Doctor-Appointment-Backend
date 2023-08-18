const bcrypt = require("bcrypt")
const User = require("../models/userModel.js")
const Doctor = require("../models/doctorModel")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../helpers/jwt-token.js")

//@disc Get All Users
//@api GET /get_all_users
//@access Private
exports.getAllUsers = asyncHandler(async (req, res) => {
    // const { id } = req.user
    // const { id } = req.params
    try {

        const allUsers = await User.find({ isAdmin: false }).select('-password')

        return res.status(200).json({ status: true, allUsers })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
})

//@disc Get All Doctors
//@api GET /get_all_doctors
//@access Private
exports.getAllDoctors = asyncHandler(async (req, res) => {
    // const { id } = req.user
    // const { id } = req.params
    try {

        const allDoctors = await Doctor.find().select('-password');

        return res.status(200).json({ status: true, allDoctors })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
})

//@disc Delete Doctor
//@api DELETE /delete_doctor
//@access Private
exports.deleteDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {

        const removeDoc = await Doctor.findByIdAndDelete({ _id: id });

        return res.status(200).json({ status: true, message: "Doctor successfully deleted" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
})

//@disc Change Confirmation Status
//@api PATCH /change_confirmation_status
//@access Private
exports.changeConfirmationStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { confirmationStats, userId } = req.body
    try {

        const updatedDoc = await Doctor.findByIdAndUpdate(id, { confirmation: confirmationStats }, { new: true });

        const updatedUser = await User.findByIdAndUpdate(updatedDoc.userId, { isDoctor: updatedDoc.confirmation === "Accepted" ? true : false }
            , { new: true })

        return res.status(200).json({ status: true, updatedDoc, updatedUser, message: "Doctor successfully updated" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
})