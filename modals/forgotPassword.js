const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FP = new Schema({
  user: {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    userName: { type: String, required: true }
  },
  isActive: Boolean
});

module.exports = mongoose.model("ForgotPassword", FP);

// const Sequelize = require("sequelize");
// const sequelize = require("../database/database");

// const FP = sequelize.define("forgotPswd", {
//   id: {
//     type: Sequelize.UUID,
//     allowNull: false,
//     primaryKey: true
//   },
//   isActive: Sequelize.BOOLEAN
// });

// module.exports = FP;
