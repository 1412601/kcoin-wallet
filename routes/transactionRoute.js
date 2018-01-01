const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");
const User = require("../models/User");

module.exports = app => {
  app.get("api/user/transaction", async (req, res) => {
    const transactions = await Transaction.find({ from: req.user.id });
    res.send({ transactions });
  });

  app.delete("api/transaction/:id", async (req, res) => {
    const transaction = await Transaction.findById(id);
    if (transaction) {
      transaction.remove();
    }
  });
};
