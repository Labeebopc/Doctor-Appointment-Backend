const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const doctorSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "Users"
    },

    firstName: {
        type: String,
        required: [true, "Please enter your name"]
    },

    lastName: {
        type: String,
        required: [true, "Please enter your last name"]
    },

    phone: {
        type: String,
        required: [true, "Please enter your mobile"]
    },

    email: {
        type: String,
        required: [true, "Please enter your email"]
    },

    password: {
        type: String,
        required: [true, "Please enter your password"]
    },

    address: {
        type: String
    },

    specialization: {
        type: String,
        required: [true, "Please enter your specialization"]
    },

    consultationFee: {
        type: Number,
        required: [true, "Please enter your consultation fee"]
    },

    // timing: {
    //     type: Object,
    //     required: [true, "Please enter your work timing"]
    // },

    timing: {
        type: Object,
    },

    confirmation: {
        type: String,
        default: "Pending"
    }

}, {
    timestamps: true
})

const doctorModel = mongoose.model("Doctors", doctorSchema)

module.exports = doctorModel;