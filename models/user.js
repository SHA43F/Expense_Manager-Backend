const mongodb = require("mongodb");
const { getDb } = require("../util/database");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(userName, email, cart, id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    const db = getDb();
    const cartItemIndex = this.cart.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );
    const updatedCartItems = [...this.cart.items];
    let newQuantity = 1;
    if (cartItemIndex >= 0) {
      newQuantity = this.cart.items[cartItemIndex].quantity + 1;
      updatedCartItems[cartItemIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
