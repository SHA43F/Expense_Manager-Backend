const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpCtrl");

router.post("/signUp", signUpController.postSignUpData);

module.exports = router;
