const { registerUser, loginUser } = require("../controller/authController.js");

const router = require("express").Router()

// app.get("/register",registerUser)
// app.post("/register",registerUser)

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

module.exports = router;



