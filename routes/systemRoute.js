const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  app.get("/system/users", async (req, res) => {
    const allUser = await User.find({}, "email balance");
    res.send({ allUser });
  });
};
