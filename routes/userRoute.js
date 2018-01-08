const mongoose = require("mongoose");
const axios = require("../utils/axiosHelper");
const helper = require("../utils/helper");

//MODEL
const User = mongoose.model("users");
const Wallet = mongoose.model("wallets");
const Transaction = mongoose.model("transactions");

module.exports = app => {
  app.get("/api/user/wallet", async (req, res) => {
    const wallet = await Wallet.findOne({ _user: req.user.id });
    const user = await User.findById(req.user.id);
    const { balance } = user;
    const { address } = wallet;

    const hangingTrans = await Transaction.find({
      from: req.user.id,
      status: 1
    });
    const availableBalance =
      balance - hangingTrans.reduce((sum, { value }) => sum + value, 0);

    res.send({ address, balance, availableBalance });
  });

  app.post("/api/initTransaction", async (req, res) => {
    const trans = await new Transaction({
      from: req.user.id,
      to: req.body.toUser,
      value: req.body.value,
      status: 0
    }).save();

    res.send(trans);
  });

  app.get("/api/sendTransactions/:idTrans", async (req, res) => {
    const currentTrans = await Transaction.findById(req.params.idTrans);
    const { from, to, value, status } = currentTrans;

    if (status === 1 || status === 2) {
      res.status(405).send();
    } else {
      const fromUser = await User.findById(from);
      const fromWallet = await Wallet.findOne({ _user: from });
      const { publicKey, privateKey, address, reference } = fromWallet;

      let sendAddress = to;

      if (to.match(/^[0-9a-fA-F]{24}$/)) {
        const toUser = await User.findById(to);
        const toWallet = await Wallet.findOne({ _user: to });

        sendAddress = toWallet.address;
      }

      // Create trans
      const createTrans = helper.createTransaction(
        { publicKey, privateKey, address },
        reference,
        fromUser.balance,
        value,
        sendAddress
      );

      try {
        const { data } = await axios.post("/transactions", createTrans);
        const { hash, outputs } = data;

        //UPDATE Transaction
        currentTrans.transHash = hash;
        currentTrans.status = 1;
        currentTrans.transactionTimeStamp = Date.now();
        currentTrans.index = 1;

        //Save to db
        const updateTrans = await currentTrans.save();

        res.send({ updateTrans });
      } catch (error) {
        console.error(error);
        res.send({ error });
      }
    }
  });
};
