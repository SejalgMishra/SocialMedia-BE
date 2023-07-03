const commnetCtrl = require("../controller/cmntCtrl")

const express = require("express")

const router = express.Router()

router.post('/cmnt' , commnetCtrl.createCmnt)

module.exports = router