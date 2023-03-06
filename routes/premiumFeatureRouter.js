const express = require("express");
const premiumFeatureCtrl = require("../controllers/premiumFeaturesCtrl");
const router = express.Router();

router.get("/showLeaderboard", premiumFeatureCtrl.getLeaderboard);

module.exports = router;
