const path = require("path");
const rootDir = require("../util/rootDir");
const Expenses = require("../modals/expenses");
const fileDownloads = require("../modals/fileDownloads");
const S3services = require("../services/S3services");
const jwt = require("jsonwebtoken");

exports.getLeaderboard = async (req, res, data) => {
  try {
    const users = await Expenses.find();
    const expenses = users.map((user) => {
      const expenses = user.expenses.reduce((currNum, expense) => {
        return expense.amount + currNum;
      }, 0);
      return {
        id: user.user.userId.toString(),
        userName: user.user.userName,
        totalAmount: expenses
      };
    });
    console.log(expenses);
    res.json(expenses);
  } catch (error) {
    console.log(error);
  }
};

exports.expenditure = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "premiumExpense.html"));
};

exports.expenditureError = (req, res, next) => {
  res.status(401).send("<h2>Not Authorized</h2>");
};

exports.downloadExpenses = async (req, res, next) => {
  try {
    const expenses = await req.body.expenses;
    const token = await req.body.token;
    const tokenData = jwt.verify(token, "secret-key");
    const stringifyExpenses = JSON.stringify(expenses);
    const fileName = `Expenses-${
      tokenData.userName
    }/Expenses-${new Date()}.txt`;
    const fileUrl = await S3services.uploadToS3(stringifyExpenses, fileName);
    const date = new Date();
    const file = { url: fileUrl, createdAt: date };
    fileDownloads.findOne({ "user.userId": tokenData.id }).then((result) => {
      if (!!result) {
        return fileDownloads.updateOne(
          { "user.userId": tokenData.id },
          { $push: { files: file } }
        );
      } else {
        const newFileDownload = new fileDownloads({
          user: {
            userId: tokenData.id,
            userName: tokenData.userName
          },
          files: file
        });
        return newFileDownload.save();
      }
    });
    res.status(200).json({ fileUrl, success: true });
  } catch (err) {
    res.status(500).json({ fileUrl: "", success: false, err: err });
  }
};
