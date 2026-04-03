import Record from "../models/Record.js";
export const getSummary = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);
    let income = 0;
    let expense = 0;
    result.forEach((item) => {
      if (item._id === "income") {
        income = item.total;
      }
      if (item._id === "expense") {
        expense = item.total;
      }
    });
    const netBalance = income - expense;
    res.status(200).json({
      totalIncome: income,
      totalExpense: expense,
      netBalance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getCategoryTotals = async (req, res) => {
  try {
    const totals = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $num: "$amount" },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);
    res.status(200).json(totals);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getRecentRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
