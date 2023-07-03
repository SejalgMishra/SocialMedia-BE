const { isObjectIdOrHexString } = require("mongoose");
const userSchema = require("../model/userModel");

class userCtrl {
  static serchUser = async (req, res) => {
    try {
      const user = await userSchema
        .findOne({ username: { $regex: req.query.username } })
        .limit(10)
        .select("fullname username avatar");
      res.json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };

  static getUser = async (req, res) => {
    const { id } = req.params
    console.log(req.query);
    try {
      const user = await userSchema.findById(id).select("-password")
      console.log(user);
      if(!user) return res.status(500).send("ghjgf");
      res.json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };

  static updateUser = async (req, res) => {
    
    try {
      const { avatar , fullname, mobile, address, website, story, gender } = req.body

      const user = await userSchema.findByIdAndUpdate({_id : req.user._id} , {
        fullname, mobile, address, website, story, gender , avatar
      } , {new : true})

      res.json({msg : "user updated"})
      console.log(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };
}

module.exports = userCtrl;
