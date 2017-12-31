const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  from: String,
  to: String,
  transHash: String,
  blockHash: String,
  value: { type: Number, default: 0 },
  status: Number
});

mongoose.model("transactions", transactionSchema);
