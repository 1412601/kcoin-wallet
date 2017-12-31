const mongoose = require("mongoose");
const { Schema } = mongoose;

const referenceOutputSchema = new Schema({
  hash: String,
  index: { type: Number, default: -1 }
});

mongoose.model("referenceOutputs", referenceOutputSchema);
