const postSchema = require("../model/postModel");

class postCtrl {
  static createPost = async (req, res) => {
    try {
      const { content, images } = req.body;

      const newPosts = await postSchema.create({
        content,
        images,
        user: req.user._id,
      });
      res.json({ msg: "post created", newPosts, user: req.user._id });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  static getPost = async (req, res) => {
    try {
      console.log(req.user);
      const posts = await postSchema
        .find({ user: [...req.user.following, req.user._id] })
        .sort("-createdAt")
        .populate("user likes", "avatar username fullname")
        .populate({
          path : "comments",
          populate : {
            path : "user likes",
            select : "-password"
          },
          options: { strictPopulate: false }
        })
      res.json({ msg: "success", posts });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  static updatePost = async (req, res) => {
    try {
      const { content, images } = req.body;
      const updatePost = await postSchema
        .findByIdAndUpdate({ _id: req.params.id }, { content, images })
        .populate("user likes", "avatar username fullname");
      console.log(updatePost);
      res.json({
        msg: "Upadated",
        new: {
          ...updatePost._doc,
          content,
          images,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  static likePost = async (req, res) => {
    try {
      await postSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );
      res.json({ msg: " post liked" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  static unlikePost = async (req, res) => {
    try {
      await postSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      res.json({ msg: " post unliked" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };
}

module.exports = postCtrl;
