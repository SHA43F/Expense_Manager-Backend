const express = require("express");
const expenseController = require("../controllers/expenseCtrl");
const authMiddleware = require("../controllers/authMiddleware");
const router = express.Router();

router.get(
  "/expenses",
  authMiddleware.retrieveUserId,
  expenseController.getExpenses
);

router.post("/addExpense", expenseController.postExpenseData);

router.post("/editExpense", expenseController.editExpenseItem);

router.post("/deleteExpense", expenseController.deleteExpenseItem);

module.exports = router;
