const RazorPay = require("razorpay");
const Orders = require("../modals/orders");
const jwt = require("jsonwebtoken");
const Users = require("../modals/users");
require("dotenv").config();

function generateAccessToken(id, userName) {
  return jwt.sign({ userId: id, userName: userName }, "secret-key");
}

exports.postOrders = (req, res) => {
  try {
    var razor = new RazorPay({
      key_id: process.env.RAZOR_ID,
      key_secret: process.env.RAZOR_KEY
    });
    const amount = 2500;
    razor.orders.create({ amount: amount, currency: "INR" }, (err, order) => {
      if (err) {
        return new Error(JSON.stringify(err));
      }
      const newOrder = new Orders({
        user: { userId: req.user._id, userName: req.user.userName },
        order: { orderId: order.id, status: "Pending" }
      });
      newOrder
        .save()
        .then(() => {
          return res.status(201).json({ order, key_id: razor.key_id });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { payment_id, order_id } = req.body;
    if (payment_id == null) {
      const promise1 = Orders.findOneAndUpdate(
        { "order.orderId": order_id },
        { "order.status": "Failed" }
      );
      const promise2 = Users.findByIdAndUpdate(
        { _id: userId },
        { isPremiumUser: false }
      );
      Promise.all([promise1, promise2])
        .then(() => {
          return res.status(407).json({
            success: false,
            message: "Transaction Failed",
            token: generateAccessToken(userId, undefined, false)
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      const promise3 = Orders.findOneAndUpdate(
        { "order.orderId": order_id },
        {
          "order.paymentId": payment_id,
          "order.status": "Successful"
        }
      );
      const promise4 = Users.findByIdAndUpdate(
        { _id: userId },
        { isPremiumUser: true }
      );
      Promise.all([promise3, promise4])
        .then(() => {
          return res.status(202).json({
            success: true,
            message: "Transaction Successful",
            token: generateAccessToken(userId, undefined, true)
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
  }
};
