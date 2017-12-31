const WebSocket = require("ws");
const wss = new WebSocket("wss://api.kcoin.club");
const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

wss.on("open", () => {
  console.log("OPEN SOCKET");
  setInterval(() => {
    wss.send("something");
  }, 40000);
});

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
    console.log(blockData);

    transactions.forEach(async ({ hash }) => {
      const trans = await Transaction.findOne({ transHash: hash });
      trans.blockHash = blockHash;
      trans.blockTimeStamp = blockTimestamp;
      trans.status = 2;

      await trans.save();
      console.log("UPDATED: ", trans);
    });
  }
});
