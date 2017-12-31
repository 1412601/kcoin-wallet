const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  address: String,
  publicKey: String,
  privateKey: String,
  referenceOutputHash: String
});

mongoose.model("admin", adminSchema);
