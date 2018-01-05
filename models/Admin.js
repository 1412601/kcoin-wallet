const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  username: String,
  password: String,
  address: String,
  publicKey: String,
  privateKey: String,
  balance: Number,
  referenceOutputHash: String,
  referenceOutputIndex: Number
});

mongoose.model("admin", adminSchema);
