const jwt = require("jsonwebtoken");
const Users = require("../modals/users");

exports.retrieveUserId = (req, res, next) => {
  try {
    const token = req.header("Auth");
    const tokenData = jwt.verify(token, "secret-key");
    Users.findOne({ _id: tokenData.id }).then((user) => {
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};
