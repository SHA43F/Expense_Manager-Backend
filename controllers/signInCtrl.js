const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../modals/users");

exports.postSignInData = (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((emailExistance) => {
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
              if (emailExistance.isPremiumUser === true) {
                return res.status(201).json({
                  email: req.body.email,
                  idToken: token,
                  userName: emailExistance.userName,
                  isPremiumUser: true
                });
              }

              res.status(201).json({
                email: req.body.email,
                idToken: token,
                userName: emailExistance.userName,
                isPremiumUser: false
              });
            } else {
              res.status(401).json({ message: "Incorrect Password..." });
            }
          }
        );
      } else {
        res.status(404).json({ message: "Email Not Found..Please Sign Up" });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
