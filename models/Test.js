const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSchema = new Schema({
  referenceOutputHash: String
});

mongoose.model("test", testSchema);
