const jwt = require("jsonwebtoken");
const Expenses = require("../modals/expenses");

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expenses.findOne({
      "user.userId": req.user.id
    }).populate("expenses");

    let expenseObject = {};

    if (expenses !== null) {
      expenseObject = {
        expenses: expenses.expenses,
        isPremiumUser: req.user.isPremiumUser
      };
    } else {
      expenseObject = {
        expenses: [],
        isPremiumUser: req.user.isPremiumUser
      };
    }

    res.status(200).json(expenseObject);
  } catch (error) {
    res.status(400).send("Something Error Happened");
  }
};

exports.postExpenseData = (req, res) => {
  const { description, category, amount, token, incomeExpense } = req.body;
  const tokenData = jwt.verify(token, "secret-key");
  userId = tokenData.id;
  const expense = {
    incomeExpense: incomeExpense,
    amount: amount,
    category: category,
    description: description,
    createdAt: new Date()
  };

  Expenses.findOne({ "user.userId": tokenData.id })
    .then((result) => {
      if (!!result) {
        return Expenses.updateOne(
          { "user.userId": tokenData.id },
          { $push: { expenses: expense } }
        );
      } else {
        const newUserExpense = new Expenses({
          user: {
            userId: tokenData.id,
            userName: tokenData.userName
          },
          expenses: expense
        });
        return newUserExpense.save();
      }
    })
    .then(() => {
      res.status(200).json({ message: "Expense Added" });
    })
    .catch((err) => {
      res.status(401).json({ message: "Something Error Happened..." });
    });
};

exports.deleteExpenseItem = (req, res) => {
  const expenseId = req.body.expenseId;
  const tokendata = jwt.verify(req.body.token, "secret-key");

  Expenses.findOneAndUpdate(
    { "user.userId": tokendata.id },
    { $pull: { expenses: { _id: expenseId } } }
  )
    .then(() => {
      res.status(200).json({ message: "Successfully deleted item" });
    })
    .catch(() => {
      res.status(400).json({ message: "Error in deleting item" });
    });
};

exports.editExpenseItem = async (req, res) => {
  const tokendata = jwt.verify(req.body.token, "secret-key");

  try {
    const userExpenses = await Expenses.findOne({
      "user.userId": tokendata.id
    });

    if (!!userExpenses) {
      const expenses = userExpenses.expenses;
      const expenseItemIndex = userExpenses.expenses.findIndex(
        (expense) => expense._id.toString() === req.body.expenseId
      );

      expenses[expenseItemIndex] = {
        ...expenses[expenseItemIndex],
        amount: req.body.money,
        description: req.body.description,
        category: req.body.category,
        incomeExpense: req.body.incomeExpense,
        createdAt: new Date()
      };

      const editSuccess = await Expenses.findOneAndUpdate(
        { "user.userId": tokendata.id },
        { expenses: expenses }
      );

      if (!editSuccess) {
        throw new Error(
          "Something went wrong in editing expense!..Please Try Again"
        );
      }
      res.status(200).json({ message: "Successfully edited item" });
    } else {
      throw new Error("No User Found");
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
