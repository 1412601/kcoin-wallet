const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  email: String,
  twoFactor: Object,
  balance: { type: Number, default: 0 },
  isActivated: { type: Boolean, default: false }
});

mongoose.model("users", userSchema);
