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
  wss.on("message", async dataString => {
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

          // Update User wallet
          const { from, to, index } = trans;

          //UPDATE Sender
          from === "system"
            ? await updateSystem(outputs)
            : await updateFromUser(from, outputs, hash);

          //UPDATE Receiver
          if (to.match(/^[0-9a-fA-F]{24}$/)) {
            const toUser = await User.findById(to);
            const toWallet = await Wallet.findOne({ _user: to });

            toUser.balance += outputs[index].value;
            toWallet.reference.push({ hash, index });

            // Save to db
            await toUser.save();
            await toWallet.save();
          }
          await trans.save();

          console.log("UPDATE TRANS", trans);
          io.emit("UPDATE");
        }
      });
    } else if (data.type === "transaction") {
      const { data: transData } = data;
      const { hash: transHash, inputs, outputs } = transData;
      const address = helper.getAddressFromPublicKey(
        inputs[0].unlockScript.split(" ")[1]
      );
      const checkAvailableTrans = await isTransAvailable(transHash, address);
      console.log("TRANS AVAILABLE", checkAvailableTrans);

      if (!checkAvailableTrans) {
        let outputData = await Promise.all(
          outputs
            .map(async ({ value, lockScript }, index) => {
              //Check output belong to system
              const wallet = await Wallet.findOne({
                address: lockScript.substring(4)
              });
              return wallet !== null ? { value, index, wallet } : null;
            })
            .filter(output => output !== null)
        );

        outputData = outputData.filter(output => output !== null);

        console.log("OUTPUT DATA", outputData);

        if (outputData.length !== 0) {
          outputData.forEach(async ({ value, index, wallet }) => {
            const user = await User.findById(wallet._user);
            console.log("USER", user);
            const newTrans = await new Transaction({
              from: address,
              to: user._id,
              value,
              transHash,
              transactionTimeStamp: Date.now(),
              status: 1,
              index
            }).save();
            console.log("NEW TRANS", newTrans);
            //Send message to client

            io.emit("NEW", address);
          });
        }
      }
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
  // Check valid user id or address
  if (from.match(/^[0-9a-fA-F]{24}$/)) {
    const fromUser = await User.findById(from);
    const fromWallet = await Wallet.findOne({ _user: from });

    fromUser.balance = outputs[0].value;
    fromWallet.reference = [{ hash, index: 0 }];

    await fromUser.save();
    await fromWallet.save();
  }
}

async function isTransAvailable(transHash, address) {
  const admin = await Admin.find({ address });
  const wallet = await Wallet.find({ address });

  return admin.length !== 0 || wallet.length !== 0;
}
