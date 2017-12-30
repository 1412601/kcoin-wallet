const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    googleId: String,
    transactionType: {
        type: String,
        enum: ["In","Out"]
    },
    address: String,
    amount: {
        type: Number,
        default: 0
    },
    blockHash: String,
    date: Date,
    status: {
        type: String,
        enum: ["Initialized","Processing","Completed"]
    }
});

mongoose.model("transactions", transactionSchema);