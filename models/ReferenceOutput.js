const mongoose = require("mongoose");
const { Schema } = mongoose;

const referenceOuputSchema = new Schema({
  hash: String,
  index: { type: Number, default: -1 }
});

mongoose.model("referenceOutputs", referenceOuputSchema);
