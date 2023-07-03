const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
       
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{type: mongoose.Types.ObjectId, ref: 'users'}],
    user: {type: mongoose.Types.ObjectId, ref: 'users'},
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, {
    timestamps: true
})

module.exports = mongoose.model('comment', commentSchema)