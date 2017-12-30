const mongoose = require("mongoose");
const { Schema } = mongoose;

const walletSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  address: String,
  publicKey: String,
  privateKey: String,
  referenceOutputHash: [String]
});

mongoose.model("wallets", walletSchema);
