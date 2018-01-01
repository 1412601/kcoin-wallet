const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

module.exports = app => {
  app.get("/user/transaction", async (req, res) => {
    const transactions = await Transaction.find({
      $or: [{ from: req.user.id }, { to: req.user.id }]
    });
    res.send({ transactions });
  });

  app.delete("/transaction/:id", async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      await transaction.remove();
      res.send("Deleted!");
    } else res.send("Not found");
  });
};
