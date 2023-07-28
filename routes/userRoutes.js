const router = require("express").Router();
const { userRegistration, userLogin, getUserData } = require("../controllers/userController");
const { authUser } = require("../middlewares/auth-middleware");



router.post("/user_registration", userRegistration);
router.post("/user_login", userLogin);
router.post("/get_user_data",authUser,getUserData)

module.exports = router;