const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // id: {
  //   type: Number,
  //   allowNull: false,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isPremiumUser: {
    type: Boolean
  }
});

module.exports = mongoose.model("User", UserSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../database/database");

// const Users = sequelize.define("users", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   userName: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   isPremiumUser: Sequelize.BOOLEAN
// });

// module.exports = Users;
