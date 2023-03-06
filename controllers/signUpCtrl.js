const Users = require("../modals/users");
const bcrypt = require("bcrypt");

exports.postSignUpData = (req, res) => {
  const { userName, email, password } = req.body;

  try {
    bcrypt.hash(password, 10, (err, hash) => {
      const user = new Users({
        userName: userName,
        email: email,
        password: hash
      });
      user
        .save()
        .then(() => {
          return res.status(200).json({ response: "Successful" });
        })
        .catch((err) => {
          res.status(400).json({ response: err });
        });
    });
  } catch (err) {
    res.status(400).json({ response: err });
  }
};
