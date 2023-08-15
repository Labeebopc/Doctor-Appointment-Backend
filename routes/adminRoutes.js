const router = require("express").Router();
const { getAllUsers, getAllDoctors, deleteDoctor, changeConfirmationStatus } = require("../controllers/adminController");
const { getAllNotification } = require("../controllers/userController");

//GET_ALL_NOTIFICATION || GET
router.get("/admin/get_all_notification/:id", getAllNotification)

//GET_ALL_USERS || GET
router.get("/admin/get_all_users", getAllUsers)

//GET_ALL_DOCTORS || GET
router.get("/admin/get_all_doctors", getAllDoctors)

//DELETE_DOCTOR || DELETE
router.delete("/admin/delete_doctor/:id", deleteDoctor)

//CHANGE_CONFIRMATION_STATUS || PATCH
router.patch("/admin/change_confirmation_status/:id", changeConfirmationStatus)

module.exports = router;