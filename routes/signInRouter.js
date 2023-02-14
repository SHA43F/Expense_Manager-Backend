const express = require("express");
const router = express.Router();
const signInController = require("../controllers/signInCtrl");

router.get("/", signInController.getIndex);

router.get("/signIn", signInController.getSignInData);

router.post("/signIn", signInController.postSignInData);

module.exports = router;
