const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  from: String,
  to: String,
  transHash: String,
  blockHash: String,
  value: { type: Number, default: 0 },
  blockTimeStamp: Date,
  transactionTimeStamp: Date,
  status: Number,
  index: Number
});

mongoose.model("transactions", transactionSchema);
