const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const expenseRouter = require("./routes/expenseRouter");
const purchaseRouter = require("./routes/purchaseRouter");
const forgotPasswordRouter = require("./routes/forgotPasswordRouter");
const premiumFeatureRouter = require("./routes/premiumFeatureRouter");

const mongoose = require("mongoose");

const app = express();
app.use(cors());

const loggingInfo = fs.createWriteStream(
  path.join(__dirname, "loggingInfo.log"),
  {
    flags: "a"
  }
);

app.use(morgan("combined", { stream: loggingInfo }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(signUpRouter);
app.use(signInRouter);
app.use(expenseRouter);
app.use(purchaseRouter);
app.use(forgotPasswordRouter);
app.use(premiumFeatureRouter);

mongoose
  .connect(
    "mongodb+srv://User1:confidential@cluster0.5ai12dw.mongodb.net/expense-tracker?retryWrites=true&w=majority"
  )
  .then(() => app.listen(3000))
  .catch((err) => {
    console.log(err);
  });
