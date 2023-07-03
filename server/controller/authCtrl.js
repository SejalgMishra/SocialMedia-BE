const userSchema = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  return jwt.sign(payload, "12345", { expiresIn: "2h" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, "67890", { expiresIn: "30d" });
};

class authController {
  static getData = async (req, res) => {
    try {
      const getdata = await userSchema.find({});
      res.json(getdata);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };
  static regsiter = async (req, res) => {
    const { fullname, username, email, password , gender } = req.body;
    console.log(req.body);
    try {
      const user_name = await userSchema.findOne({ username });
      if (user_name)
        return res
          .status(400)
          .json({ message: "This user name already occupied.." });

      const user_email = await userSchema.findOne({ email });
      if (user_email)
        return res.status(400).json({ message: "This email already exists.." });

      const hashPassword = await bcrypt.hash(password, 10);

      const addData = await userSchema.create({
        fullname,
        username,
        email,
        password: hashPassword,
        gender
      });

      const access_token = createAccessToken({ id: addData._id });
      const refresh_token = createRefreshToken({ id: addData._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        msg: "Register Success!",
        access_token,
        user: {
          ...addData._doc,
          password: "",
        },
      });
      console.log(addData);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userSchema
        .findOne({ email  })
        .populate(
          "followers following",
          "avatar username fullname followers following"
        );

      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      console.log(user);

      res.json({
        msg: "Login Success!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };

  static logOut = async (req, res) => {
    try {
      res.clearCookie("refreshtoken");
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };

  

  static refreshToken = async (req, res) => {
    const { id } = req.body
    try {
      const rf_token = req.cookies.refreshtoken
      if(!rf_token) return res.status(400).json({msg: "Please login now."})
      console.log(req.body);
      const user = await userSchema.findById(req.body._id ).select("-password")
          .populate('followers following', 'avatar username fullname followers following')

      const refresh_token = jwt.sign({ id: req.body._id }, "12345", { expiresIn: "1d" })
      res.cookie("refreshtoken", refresh_token, { httpOnly: true })
      return res.json({ refresh_token , user: {
        user,
        password: "",
      } ,  msg: "Refreshed!" });
      } catch (err) {
        return res.status(500).json({msg: err.message})
        }

}
}

module.exports = authController;
