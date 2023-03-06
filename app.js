const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const expenseRouter = require("./routes/expenseRouter");
const purchaseRouter = require("./routes/purchaseRouter");
const forgotPasswordRouter = require("./routes/forgotPasswordRouter");
const premiumFeatureRouter = require("./routes/premiumFeatureRouter");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(signUpRouter);
app.use(signInRouter);
app.use(expenseRouter);
app.use(purchaseRouter);
app.use(forgotPasswordRouter);
app.use(premiumFeatureRouter);

mongoose
  .connect(process.env.MONGO_CRED)
  .then(() => app.listen(process.env.PORT || 5000))
  .catch((err) => {
    console.log(err);
  });
