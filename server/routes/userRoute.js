const router = require("express").Router()
const auth = require("../../middleware/auth")
const userCtrl = require("../controller/userCtl")

router.get("/search" , auth , userCtrl.serchUser)

router.get("/user/:id" , auth , userCtrl.getUser)

router.patch("/user" , auth , userCtrl.updateUser)




module.exports= router