const auth = require("../../middleware/auth")
const postCtrl = require("../controller/postCtrl")

const express = require ("express")

const router = express.Router()

router.post("/post" , auth , postCtrl.createPost)

router.get("/post" , auth , postCtrl.getPost)

router.patch("/post/:id" , auth , postCtrl.updatePost)

router.patch("/post/:id/like" , auth , postCtrl.likePost)

router.patch("/post/:id/unlike" , auth , postCtrl.unlikePost)





module.exports = router