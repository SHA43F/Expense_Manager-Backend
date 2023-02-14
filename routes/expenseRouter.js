const express = require("express");
const expenseController = require("../controllers/expenseCtrl");

const authMiddleware = require("../controllers/authMiddleware");
const router = express.Router();

router.get("/expense", expenseController.getExpenseData);

router.post("/expense", expenseController.postExpenseData);

router.get(
  "/expenses",
  authMiddleware.retrieveUserId,
  expenseController.getExpenses
);

router.post("/deleteExpense", expenseController.deleteExpenseItem);

module.exports = router;
