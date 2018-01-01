const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

module.exports = app => {
<<<<<<< HEAD
  app.get("/user/transaction", async (req, res) => {
    const transactions = await Transaction.find({
      $or: [{ from: req.user.id }, { to: req.user.id }]
    });
    res.send({ transactions });
  });

  app.delete("/transaction/:id", async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
=======
  app.get("api/user/transaction", async (req, res) => {
    const transactions = await Transaction.find({ from: req.user.id });
    res.send({ transactions });
  });

  app.delete("api/transaction/:id", async (req, res) => {
    const transaction = await Transaction.findById(id);
>>>>>>> 6cd91bcf823b9e2be0af733edbdd93559734ea87
    if (transaction) {
      transaction.remove();
      res.send("Deleted!");
    } else res.send("Not found");
  });
};
