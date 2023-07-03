const authController = require("../controller/authCtrl")

const express = require("express")

const router = express.Router()

router.get("/" , authController.getData)


router.post("/" , authController.regsiter)

router.post("/login" , authController.login)

router.post("/logout" , authController.logOut)

 router.post("/refresh_token" , authController.refreshToken)

module.exports = router

