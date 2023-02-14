const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  user: {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    userName: { type: String, required: true }
  },
  files: [
    {
      url: {
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

module.exports = mongoose.model("File", FileSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../database/database");

// const FileDownloads = sequelize.define("fileDownloads", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   url: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// module.exports = FileDownloads;
