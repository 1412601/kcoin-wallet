const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  sender: String,
  receiver: String,
  transHash: String,
  value: { type: Number, default: 0 },
  status: Boolean // false: Processing - 1: Complete
});

mongoose.model("transactions", transactionSchema);
