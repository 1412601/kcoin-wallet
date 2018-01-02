const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

module.exports = app => {
  app.get("/api/user/transaction", async (req, res) => {
    const { type } = req.query;
    let transactions;
    switch (type) {
      case "send":
        transactions = await Transaction.find({
          from: req.user.id,
          status: 2
        });
      case "receive":
        transactions = await Transaction.find({
          to: req.user.id,
          status: 2
        });
      case "init":
        transactions = await Transaction.find({
          from: req.user.id,
          status: 0
        });
      case "pending":
        transactions = await Transaction.find({
          from: req.user.id,
          status: 1
        });
    }

    res.send(transactions);
  });

  app.delete("/transaction/:id", async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      await transaction.remove();
      res.send("Deleted!");
    } else res.send("Not found");
  });
};
