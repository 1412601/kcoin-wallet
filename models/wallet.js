const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new Schema({
    userId: String,
    address: String,
    publicKey: String,
    privateKey: String,
    refernceOutputHash: [],
});

mongoose.model("wallets", walletSchema);