const passport = require("passport");
const twoFactor = require("node-2fa");

module.exports = app => {
  app.get("/", (req, res) => {
    const newSecret = twoFactor.generateSecret({
      name: "Kcoin-Wallet",
      account: "johndoe"
    });
    const token = twoFactor.generateToken("T6ZYUIHLPWFFVTUZ3Z2OD63RKZ7XCY3J");
    console.log("TOKEN", token);
    res.send(newSecret);
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
