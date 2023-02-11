const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://User1:QSrhkDnwvJJ9j9zF@cluster0.5ai12dw.mongodb.net/shop?retryWrites=true&w=majority"
    );
    console.log("Successfully connected to mongo..");
    _db = client.db();
    callback(client);
  } catch (error) {
    console.log(error);
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "Database not found!!";
};

module.exports = mongoConnect;
module.exports.getDb = getDb;
