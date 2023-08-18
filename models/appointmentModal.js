const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref:"Users"
    },

    doctorId:{
        type: ObjectId,
        ref:"Doctors"
    },

    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    phone: {
        type: Number,
        required: [true, "Please enter your mobile number"]
    },

    date: {
        type: String,
        required: [true, "Please enter the date"]
    },

    time: {
        type: String,
        required: [true, "Please enter the time"]
    }

}, {
    timestamps: true
})

const appointmentModel = mongoose.model("Appointments", appointmentSchema)

module.exports = appointmentModel;