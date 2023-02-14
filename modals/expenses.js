const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  user: {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    userName: { type: String, required: true }
  },
  expenses: [
    {
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      incomeExpense: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Expense", ExpenseSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../database/database");

// const Expenses = sequelize.define("expenses", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   amount: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   incomeExpense: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// module.exports = Expenses;
