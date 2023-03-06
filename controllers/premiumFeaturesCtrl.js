const Expenses = require("../modals/expenses");

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await Expenses.find();

    const expenses = users.map((user) => {
      const expenses = user.expenses.reduce((currNum, expense) => {
        return expense.amount + currNum;
      }, 0);

      return {
        id: user.user.userId.toString(),
        userName: user.user.userName,
        totalAmount: expenses
      };

    });
    
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
