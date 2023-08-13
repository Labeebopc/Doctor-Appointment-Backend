const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Doctor = require("../models/doctorModel.js")
const User = require("../models/userModel.js")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../helpers/jwt-token.js")


//@disc Apply doctor
//@api POST /apply_doctor
//@access Private
exports.applyDoctor = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingDoctor = await Doctor.findOne({ email: email })
        if (existingDoctor) {

            return res.status(400).json({ status: false, message: "Doctor Already Exists" })
        }
        if (!existingDoctor) {
            const hashedPassword = await bcrypt.hash(password, 12)

            const newDoctor = await Doctor.create({ ...req.body, password: hashedPassword })
     
            // Find the admin user
            const adminUser = await User.findOne({ isAdmin: true });
            if (adminUser) {

                const newNotification = {
                    type: "apply_doctor_request",
                    message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account!`,
                    data: {
                        doctorId: newDoctor._id,
                        name: `${newDoctor.firstName} ${newDoctor.lastName}`,
                        onClickPath: "/admin/doctors"
                    }
                };

                // Push the new notification to the notifications array
                await adminUser.notification.push(newNotification);
                await adminUser.save();

                console.log("New notification added:", newNotification);
            } else {
                console.log("Admin user not found.");
            }

            // console.log(notification)

            // await User.findByIdAndUpdate(adminUser._id, { notification })

            return res.status(201).json({ status: true, newDoctor, message: "Doctor Successfully Applied" })
        }

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, error: error.message })
    }
})