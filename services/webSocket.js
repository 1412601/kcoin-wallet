const WebSocket = require("ws");
const wss = new WebSocket("wss://api.kcoin.club");
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

wss.on("open", () => {
  console.log("OPEN SOCKET");
  setInterval(() => {
    wss.send("something");
  }, 40000);
});

wss.on("message", data => {
  console.log("WEB SOCKET", data);
  if (data.type === "block") {
    const { data: blockData } = data;
    const {
      hash: blockHash,
      timestamp: blockTimestamp,
      transactions: transactions
    } = blockData;

    transactions.forEach(element => {
      Transaction.findOne({ transHash: element.hash }).then((err, trans) => {
        trans.blockHash = blockHash;
        trans.blockTimeStamp = blockTimestamp;
        trans.status = 2;

        trans.save();
        console.log("UPDATED: ", trans);
      });
    });
  }
});
