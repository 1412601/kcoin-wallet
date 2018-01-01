const mongoose = require("mongoose");
const User = mongoose.model("users");
const Transaction = mongoose.model("transactions");
const Wallet = mongoose.model("wallets");

module.exports = app => {
  app.get("/system/users", async (req, res) => {
    const allUser = await User.find({}, "email balance");
    res.send({ allUser });
  });

  app.get("/system/transactions", async (req, res) => {
    const allTransactions = await Transaction.find(
      {},
      "from to value status transactionTimeStamp"
    );
    allTransactions.reverse();
    res.send({ allTransactions });
  });

  app.get("/system/addresses", async (req, res) => {
    const allAddress = await Wallet.find({}, "_user address").populate(
      "_user",
      "balance"
    );
    res.send({ allAddress });
  });
};
