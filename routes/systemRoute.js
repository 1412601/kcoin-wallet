const mongoose = require("mongoose");
const User = mongoose.model("users");
const Transaction = mongoose.model("transactions");
const Admin = mongoose.model("admin");
const Wallet = mongoose.model("wallets");

module.exports = app => {
  app.get("/api/system/users", async (req, res) => {
    const allUser = await User.find({}, "email balance");
    res.send(allUser);
  });

  app.get("/api/system/transactions", async (req, res) => {
    const allTransactions = await Transaction.find(
      {},
      "from to value status transactionTimeStamp"
    );
    allTransactions.reverse();
    res.send(allTransactions);
  });

  app.get("/api/system/addresses", async (req, res) => {
    const allAddress = await Wallet.find({}, "_user address").populate(
      "_user",
      "email balance"
    );
    res.send(allAddress);
  });

  app.get("/api/system/statistics", async (req, res) => {
    const totalUser = await User.count({});
    const totalTransaction = await Transaction.count({});
    const { balance: systemBalance } = await Admin.findOne({}, "balance");
    res.send({ totalUser, totalTransaction, systemBalance });
  });
};
