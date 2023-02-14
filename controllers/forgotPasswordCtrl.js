const path = require("path");
const bcrypt = require("bcrypt");
const Users = require("../modals/users");
const rootDir = require("../util/rootDir");
const forgotPassword = require("../modals/forgotPassword");

exports.getForgotPasswordData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "forgotPassword.html"));
};

exports.postForgotData = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      const forgotP = new forgotPassword({
        user: { userId: user._id, userName: user.userName },
        isActive: true
      });
      forgotP.save().then((response) => {
        console.log(response);
        const id = response._id.toString();
        res.redirect(`/resetPassword/${id}`);
      });
    } else {
      throw new Error("User Not Found.");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetId = req.params.resetId;
  try {
    const resetPasswordRow = await forgotPassword.findById(resetId);
    if (!!resetPasswordRow.isActive) {
      res
        .status(201)
        .sendFile(path.join(rootDir, "views", "resetPassword.html"));
    } else {
      console.log("No reset");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.postPasswordData = async (req, res, next) => {
  const { password, confirmPassword, resetId } = req.body;
  const resetPasswordRow = await forgotPassword.findById(resetId);
  console.log(password, confirmPassword, resetId, resetPasswordRow);
  try {
    const user = await Users.findById(resetPasswordRow.user.userId);
    if (user) {
      bcrypt.hash(password, 10, async (err, hash) => {
        console.log(hash);
        try {
          await Users.findByIdAndUpdate(user._id, { password: hash });
          await forgotPassword.findByIdAndDelete(resetId);
          res.redirect("/signIn");
        } catch (error) {
          console.log(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
