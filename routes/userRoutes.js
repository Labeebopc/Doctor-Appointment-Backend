const router = require("express").Router();
const { applyDoctor } = require("../controllers/doctorController");
const { userRegistration, userLogin, getUserData } = require("../controllers/userController");
const { authUser } = require("../middlewares/auth-middleware");


//USER_REGISTRATION || POST
router.post("/user_registration", userRegistration);

//USER_LOGIN || POST
router.post("/user_login", userLogin);

//GET_USER_DATA || POST
router.post("/user/get_user_data",authUser,getUserData)

//APPLY_DOCTOR || POST
router.post("/user/apply_doctor",authUser,applyDoctor)

module.exports = router;