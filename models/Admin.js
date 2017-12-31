const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  address: String,
  publicKey: String,
  privateKey: String,
  balance: Number,
  referenceOutputHash: String,
  referenceOutputIndex: Number
});

mongoose.model("admin", adminSchema);
