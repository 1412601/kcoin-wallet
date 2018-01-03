const WebSocket = require("ws");
const wss = new WebSocket("wss://api.kcoin.club");
const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

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

    transactions.forEach(async ({ hash }) => {
      const trans = await Transaction.findOne({ transHash: hash });
      if (trans) {
        trans.blockHash = blockHash;
        //Convert timestamp -> Date
        trans.blockTimeStamp = blockTimestamp * 1000;
        trans.status = 2;

        await trans.save();
        console.log("UPDATED: ", trans);
      }
    });
  }
});
