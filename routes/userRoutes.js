const router = require("express").Router();
const { userRegistration, userLogin } = require("../controllers/userController");



router.post("/userRegistration", userRegistration);
router.post("/userLogin", userLogin);

module.exports = router;