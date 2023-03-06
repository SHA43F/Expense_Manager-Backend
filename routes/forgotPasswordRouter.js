const express = require("express");
const router = express.Router();
const forgotPasswordController = require("../controllers/forgotPasswordCtrl");

router.post("/forgotPasswordCalled", forgotPasswordController.postForgotData);

router.post("/resetPassword", forgotPasswordController.postPasswordData);

module.exports = router;
