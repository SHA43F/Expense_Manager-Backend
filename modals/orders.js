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
