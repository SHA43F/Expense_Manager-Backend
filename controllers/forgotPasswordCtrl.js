const bcrypt = require("bcrypt");
const Users = require("../modals/users");
const forgotPassword = require("../modals/forgotPassword");

exports.postForgotData = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (user) {
      const forgotP = new forgotPassword({
        user: { userId: user._id, userName: user.userName },
        isActive: true
      });

      forgotP.save().then((response) => {
        const id = response._id.toString();
        res.status(201).json({ id: id });
      });
    } else {
      throw new Error("User Not Found.");
    }
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

exports.postPasswordData = async (req, res) => {
  const { password, resetId } = req.body;
  const resetPasswordRow = await forgotPassword.findById(resetId);

  try {
    if (!!resetPasswordRow.isActive) {
      const user = await Users.findById(resetPasswordRow.user.userId);

      if (user) {
        bcrypt.hash(password, 10, async (error, hash) => {
          try {
            await Users.findByIdAndUpdate(user._id, { password: hash });
            await forgotPassword.findByIdAndDelete(resetId);
            res.status(201).json({ message: "Successfull password reset." });
          } catch (error) {
            res.status(400).json({ message: error });
          }
        });
      }
    } else {
      throw new Error("Password Reset has expired.");
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
