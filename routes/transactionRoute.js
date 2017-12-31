const Transaction = require("../models/Transaction");
const User = require("../models/User");

module.exports = app => {
  app.get("/transactions/user/:id", () => {
      User.findById(id).then((err,user) => {
        if (user) {
            Transaction.find({$or: [{from: user.address}, {to: user.address}]).then((err, trans) => {
                if (trans){
                    res.send(trans);
                }
                else res.send("No transaction available.");
            });
        }
      });
  });
};
