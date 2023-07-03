const CommentSchema = require("../model/commentModel")
const postSchema = require("../model/postModel");

class commnetCtrl  {
 
    static createCmnt = async(req , res) => {
        try {
            const { postId , content , tag , reply } = req.body

            const newCommnet = await CommentSchema.create({ user : req.body.user._id , content , tag , reply })

            await postSchema.findOneAndUpdate({_id: postId} , {
                $push : {comments : newCommnet._id}
            }, {new : true})

            res.json({newCommnet})
            console.log(newCommnet);
        } catch (error) {
            console.log(error)
        }

    }
}
 module.exports = commnetCtrl
