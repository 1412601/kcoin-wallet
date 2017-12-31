const mongoose = require("mongoose");
const { Schema } = mongoose;
const ReferenceOuput = require("./reference");

const walletSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  address: String,
  publicKey: String,
  privateKey: String,
  reference: [ReferenceOuput]
});

mongoose.model("wallets", walletSchema);
