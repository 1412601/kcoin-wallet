const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");
const User = mongoose.model("users");
const TransactionConfirmationEmailTemp = require("../services/emailTemplate/transactionConfirmEmail");
const Mailer = require("../services/Mailer");
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

  app.post("/api/transactionConfirm", async (req, res) => {
    const { type } = req.body;
    const subject =
      "[KCoin Wallet] Transaction " + type + "ing needs confirmation";
    const recipients = [{ email: req.user.email }];
    let trans = await Transaction.findById(req.body.id);
    const { to } = trans;
    trans.from = req.user.email;
    trans.to = await helper.getUser(to);
    try {
      const mailer = new Mailer(
        { subject, recipients },
        TransactionConfirmationEmailTemp(trans, type)
      );
      await mailer.send();
      res.send("Mail sent. Check email");
    } catch (err) {
      res.send("Failed to sent mail.");
    }
  });
};
