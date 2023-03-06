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

