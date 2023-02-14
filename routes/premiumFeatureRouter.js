const express = require("express");
const premiumFeatureCtrl = require("../controllers/premiumFeaturesCtrl");
const router = express.Router();

router.get("/leaderboard", premiumFeatureCtrl.getLeaderboard);

router.get("/expenditure", premiumFeatureCtrl.expenditure);

router.get("/expenditureError", premiumFeatureCtrl.expenditureError);

router.post("/expenditureDownload", premiumFeatureCtrl.downloadExpenses);

module.exports = router;
