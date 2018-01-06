const WebSocket = require("ws");
const wss = new WebSocket("wss://api.kcoin.club");
const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

module.exports = io => {
  wss.on("open", () => {
    console.log("OPEN SOCKET");
    setInterval(() => {
      wss.ping("", false, true);
    }, 30000);
  });

  //UPDATE transactions that blocked
  wss.on("message", dataString => {
    console.log("WEB SOCKET", dataString);
    const data = JSON.parse(dataString);
    if (data.type === "block") {
      const { data: blockData } = data;
      const {
        hash: blockHash,
        timestamp: blockTimestamp,
        transactions
      } = blockData;

      transactions.forEach(async ({ hash, outputs }) => {
        const trans = await Transaction.findOne({ transHash: hash });
        if (trans) {
          trans.blockHash = blockHash;
          //Convert timestamp -> Date
          trans.blockTimeStamp = blockTimestamp * 1000;
          trans.status = 2;

          await trans.save();

          // Update User wallet
          const { from, to } = trans;
          const fromUser = await User.findById(from);
          const fromWallet = await Wallet.findOne({ _user: from });

          const toUser = await User.findById(to);
          const toWallet = await Wallet.findOne({ _user: to });

          //UPDATE fromUser
          fromUser.balance = outputs[0].value;
          fromWallet.reference = [{ hash, index: 0 }];

          //UPDATE toUser
          toUser.balance += outputs[1].value;
          toWallet.reference.push({ hash, index: 1 });

          // Save to db
          await fromUser.save();
          await fromWallet.save();
          await toUser.save();
          await toWallet.save();

          //Send message to client
          io.on("connection", socket => {
            console.log("CLIENT CONNECTED");
            socket.emit("update trans", trans);
          });
        }
      });
    }
  });
};
