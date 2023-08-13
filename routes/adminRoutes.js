const router = require("express").Router();
const { getAllUsers, getAllDoctors, deleteDoctor } = require("../controllers/adminController");
const { getAllNotification } = require("../controllers/userController");

//GET_ALL_NOTIFICATION || GET
router.get("/admin/get_all_notification/:id", getAllNotification)

//GET_ALL_USERS || GET
router.get("/admin/get_all_users", getAllUsers)

//GET_ALL_DOCTORS || GET
router.get("/admin/get_all_doctors", getAllDoctors)

//DELETE_DOCTOR || DELETE
router.delete("/admin/delete_doctor/:id", deleteDoctor)

module.exports = router;