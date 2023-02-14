const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpCtrl");

router.get("/signUp", signUpController.getSignUpData);

router.post("/signUp", signUpController.postSignUpData);

module.exports = router;
