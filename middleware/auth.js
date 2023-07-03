const Users = require("../server/model/userModel")
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
console.log(token ,"ghfhfg");
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        const decoded = jwt.verify(token, "12345" )
        console.log(decoded?.id , "ddfgfg" );
        if(!decoded) return res.status(400).json({msg: "Invalid Authentication."})

        const user = await Users.findById(decoded?.id)
        console.log(user , "user");
        req.user = user
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


module.exports = auth