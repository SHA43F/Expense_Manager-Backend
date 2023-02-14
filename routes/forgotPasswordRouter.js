const express = require("express");
const router = express.Router();
const forgotPasswordController = require("../controllers/forgotPasswordCtrl");

router.get("/forgotPassword", forgotPasswordController.getForgotPasswordData);

router.post("/forgotPasswordCalled", forgotPasswordController.postForgotData);

router.get("/resetPassword/:resetId", forgotPasswordController.resetPassword);

router.post("/updatePassword", forgotPasswordController.postPasswordData);

module.exports = router;
