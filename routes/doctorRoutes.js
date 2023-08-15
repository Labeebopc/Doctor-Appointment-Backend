const { getDoctorInfo } = require("../controllers/doctorController");

const router = require("express").Router();


//GET_DOCTOR_INFO || GET
// router.get("/doctor/get_doctor_info/:id",getDoctorInfo)

//GET_DOCTOR_INFO || POST
router.post("/doctor/get_doctor_info",getDoctorInfo)

module.exports = router;