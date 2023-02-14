const express = require("express");
const expenseController = require("../controllers/expenseCtrl");
const authMiddleware = require("../controllers/authMiddleware");
const orderController = require("../controllers/ordersCtrl");
const router = express.Router();

router.get(
  "/premium",
  authMiddleware.retrieveUserId,
  orderController.postOrders
);

router.post(
  "/updateStatus",
  authMiddleware.retrieveUserId,
  orderController.updateOrders
);

module.exports = router;
