const { getDoctorInfo, updateDoctorProfile } = require("../controllers/doctorController");

const router = require("express").Router();


//GET_DOCTOR_INFO || GET
// router.get("/doctor/get_doctor_info/:id",getDoctorInfo)

//GET_DOCTOR_INFO || POST
router.post("/doctor/get_doctor_info", getDoctorInfo)

//UPDATE_DOCTOR_PROFILE || POST
router.post("/doctor/update_doctor_profile", updateDoctorProfile)

module.exports = router;