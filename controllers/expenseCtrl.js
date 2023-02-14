const path = require("path");
const jwt = require("jsonwebtoken");
const rootDir = require("../util/rootDir");
const Expenses = require("../modals/expenses");
const FileDownloads = require("../modals/fileDownloads");

exports.getExpenseData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "expense.html"));
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expenses.findOne({
      "user.userId": req.user.id
    }).populate("expenses");
    let fileDownloads = await FileDownloads.findOne({
      "user.userId": req.user.id
    });

    let expenseObject = {};
    if (expenses !== null && fileDownloads !== null) {
      expenseObject = {
        expenses: expenses.expenses,
        isPremiumUser: req.user.isPremiumUser,
        fileDownloads: fileDownloads.files
      };
    } else if (expenses !== null && fileDownloads == null) {
      expenseObject = {
        expenses: expenses.expenses,
        isPremiumUser: req.user.isPremiumUser,
        fileDownloads: []
      };
    } else {
      expenseObject = {
        expenses: [],
        isPremiumUser: req.user.isPremiumUser,
        fileDownloads: []
      };
    }
    res.status(200).json(expenseObject);
  } catch (error) {
    res.status(400).send("Something Error Happened");
  }
};

exports.postExpenseData = (req, res, next) => {
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
      res.redirect("/expense");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpenseItem = (req, res, next) => {
  const expenseId = req.body.expenseId;
  const tokendata = jwt.verify(req.body.tokenId, "secret-key");
  Expenses.findOneAndUpdate(
    { "user.userId": tokendata.id },
    { $pull: { expenses: { _id: expenseId } } }
  )
    .then((result) => {
      res.redirect("/expense");
    })
    .catch((err) => {
      console.log(err);
    });
};
