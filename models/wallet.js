const mongoose = require("mongoose");
const { Schema } = mongoose;
const ReferenceOutput = require("./ReferenceOutput");

const walletSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  address: String,
  publicKey: String,
  privateKey: String,
  reference: [ReferenceOutput]
});

mongoose.model("wallets", walletSchema);
