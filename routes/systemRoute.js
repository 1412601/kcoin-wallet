const mongoose = require("mongoose");
const User = mongoose.model("users");
const Transaction = mongoose.model("transactions");
const Admin = mongoose.model("admin");
const Wallet = mongoose.model("wallets");
const helper = require("../utils/helper");

module.exports = app => {
  app.get("/api/system/users", async (req, res) => {
    const allUser = await User.find({}, "email balance");
    res.send(allUser);
  });

  app.get("/api/system/allUsers", async (req, res) => {
    const { page } = req.query;
    const MAX_RECORDS = 10;
    const allUser = await User.find({}, "email balance");
    const { length: count } = allUser;
    const numbOfPages = Math.ceil(count / MAX_RECORDS);
    const users = allUser.slice((page - 1) * MAX_RECORDS, page * MAX_RECORDS);
    res.send({ users, numbOfPages, MAX_RECORDS });
  });

  app.get("/api/system/transactions", async (req, res) => {
    const { page } = req.query;
    const MAX_RECORDS = 10;
    const allTransactions = await Transaction.find(
      {},
      "from to value status transactionTimeStamp"
    ).sort({ transactionTimeStamp: "desc" });
    const { length: count } = allTransactions;
    const numbOfPages = Math.ceil(count / MAX_RECORDS);

    const pageTransactions = allTransactions.slice(
      (page - 1) * MAX_RECORDS,
      page * MAX_RECORDS
    );
    const transactions = await helper.getTransInfoWithUser(pageTransactions);
    res.send({ trans: transactions, numbOfPages, MAX_RECORDS });
  });

  app.get("/api/system/addresses", async (req, res) => {
    const { page } = req.query;
    const MAX_RECORDS = 10;
    const allAddress = await Wallet.find({}, "_user address").populate(
      "_user",
      "email balance"
    );
    const { length: count } = allAddress;
    const numbOfPages = Math.ceil(count / MAX_RECORDS);
    const addresses = allAddress.slice(
      (page - 1) * MAX_RECORDS,
      page * MAX_RECORDS
    );
    res.send({ addresses, numbOfPages, MAX_RECORDS });
  });

  app.get("/api/system/statistics", async (req, res) => {
    const totalUser = await User.count({});
    const totalTransaction = await Transaction.count({});
    const { balance: systemBalance } = await Admin.findOne({}, "balance");
    res.send({ totalUser, totalTransaction, systemBalance });
  });
};
