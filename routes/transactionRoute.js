const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");
const User = mongoose.model("users");

const helper = require("../utils/helper");

module.exports = app => {
  app.get("/api/user/transaction", async (req, res) => {
    const { type } = req.query;
    switch (type) {
      case "send":
        {
          const transactions = await Transaction.find({
            from: req.user.id,
            status: 2
          });
          const trans = await helper.getTransInfoWithUser(transactions);
          res.send(trans);
        }
        break;
      case "receive":
        {
          transactions = await Transaction.find({
            to: req.user.id,
            status: 2
          });
          const trans = await helper.getTransInfoWithUser(transactions);
          res.send(trans);
        }
        break;

      case "init":
        {
          transactions = await Transaction.find({
            from: req.user.id,
            status: 0
          });
          const trans = await helper.getTransInfoWithUser(transactions);
          res.send(trans);
        }
        break;

      case "pending":
        {
          transactions = await Transaction.find({
            $or: [{ from: req.user.id }, { to: req.user.id }],
            status: 1
          });
          const trans = await helper.getTransInfoWithUser(transactions);
          res.send(trans);
        }
        break;
    }
  });

  app.delete("/api/transaction/:id", async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      await transaction.remove();
      res.send("Deleted!");
    } else res.send("Not found");
  });
};
