const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize("expense-tracker", "root", "Sqlroot@1", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
