const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    userName: { type: String, required: true }
  },
  order: {
    paymentId: {
      type: String
    },
    orderId: {
      type: String
    },
    status: {
      type: String
    }
  }
});

module.exports = mongoose.model("Order", OrderSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../database/database");

// const Orders = sequelize.define("orders", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   paymentId: {
//     type: Sequelize.STRING,
//     allowNull: true
//   },
//   orderId: {
//     type: Sequelize.STRING
//   },
//   status: {
//     type: Sequelize.STRING
//   }
// });

// module.exports = Orders;
