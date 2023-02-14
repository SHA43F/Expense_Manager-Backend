const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../modals/users");
const rootDir = require("../util/rootDir");

exports.getIndex = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "index.html"));
};

exports.getSignInData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "signIn.html"));
};

exports.postSignInData = (req, res, next) => {
  Users.findOne({ email: req.body.email }).then((emailExistance) => {
    if (!!emailExistance) {
      const emailExistanceId = emailExistance._id.toString();
      bcrypt.compare(
        req.body.password,
        emailExistance.password,
        (err, result) => {
          if (err) {
            return res.status(500).send("<h3>Some Error Happened..</h3>");
          }
          if (result) {
            const token = jwt.sign(
              {
                id: emailExistanceId,
                userName: emailExistance.userName
              },
              "secret-key"
            );
            if (emailExistance.isPremiumUser === 1) {
              return res.json({ token: token, isPremiumUser: true });
            }
            console.log(token);
            res.json({ token: token });
          } else {
            res.status(401).send("<h3>Incorrect password.. Try again</h3>");
          }
        }
      );
    } else {
      res.status(404).send("<h3>No Email Found</h3>");
    }
  });
};
