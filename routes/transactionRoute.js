const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");
const User = mongoose.model("users");

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
          const trans = await Promise.all(
            transactions.map(async trans => {
              const fromUser = await User.findById(trans.from);
              const toUser = await User.findById(trans.to);
              trans.from = fromUser.email;
              trans.to = toUser.email;
              return trans;
            })
          );
          res.send(trans);
        }
        break;
      case "receive":
        {
          transactions = await Transaction.find({
            to: req.user.id,
            status: 2
          });
          const trans = await Promise.all(
            transactions.map(async trans => {
              const { from, to } = trans;
              const fromUser =
                from === "system" ? "System" : await User.findById(from);
              const toUser = await User.findById(to);
              trans.from = from === "system" ? "System" : fromUser.email;
              trans.to = toUser.email;
              return trans;
            })
          );
          res.send(trans);
        }
        break;

      case "init":
        {
          transactions = await Transaction.find({
            from: req.user.id,
            status: 0
          });
          const trans = await Promise.all(
            transactions.map(async trans => {
              const fromUser = await User.findById(trans.from);
              const toUser = await User.findById(trans.to);
              trans.from = fromUser.email;
              trans.to = toUser.email;
              return trans;
            })
          );
          res.send(trans);
        }
        break;

      case "pending":
        {
          transactions = await Transaction.find({
            from: req.user.id,
            status: 1
          });
          const trans = await Promise.all(
            transactions.map(async trans => {
              const { from, to } = trans;
              const fromUser =
                from === "system" ? "System" : await User.findById(from);
              const toUser = await User.findById(to);
              trans.from = from === "system" ? "System" : fromUser.email;
              trans.to = toUser.email;
              return trans;
            })
          );
          res.send(trans);
        }
        break;
    }
  });

  app.delete("/transaction/:id", async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      await transaction.remove();
      res.send("Deleted!");
    } else res.send("Not found");
  });
};
