const helper = require("../utils/helper");
const WebSocket = require("ws");
const wss = new WebSocket("wss://api.kcoin.club");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Wallet = mongoose.model("wallets");
const Admin = mongoose.model("admin");
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

          //UPDATE Sender
          if (from === "system") {
            updateSystem(outputs);
          } else {
            updateFromUser(from, outputs, hash);
          }

          //UPDATE Receiver
          const toUser = await User.findById(to);
          const toWallet = await Wallet.findOne({ _user: to });

          toUser.balance += outputs[1].value;
          toWallet.reference.push({ hash, index: 1 });

          // Save to db
          await toUser.save();
          await toWallet.save();

          //Send message to client
          io.on("connection", socket => {
            console.log("CLIENT CONNECTED");
            socket.emit("update trans", trans);
          });
        }
      });
    } else if (data.type === "transaction") {
      const { data: transData } = data;
      const { inputs } = transData;
      const unlockScript = inputs[0].unlockScript.split(" ");
      const publicKey = unlockScript[1];
      const address = helper.getAddressFromPublicKey(publicKey);
    }
  });
};

async function updateSystem(outputs) {
  const system = await Admin.find({});
  const admin = system[0];
  admin.balance = outputs[0].value;

  await admin.save();
}

async function updateFromUser(from, outputs, hash) {
  const fromUser = await User.findById(from);
  const fromWallet = await Wallet.findOne({ _user: from });

  fromUser.balance = outputs[0].value;
  fromWallet.reference = [{ hash, index: 0 }];

  await fromUser.save();
  await fromWallet.save();
}
