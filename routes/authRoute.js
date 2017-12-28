const passport = require("passport");
const twoFactor = require("node-2fa");

module.exports = app => {
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
      res.redirect("/auth/two_factor");
    }
  );

  app.get("/auth/two_factor", (req, res) => {
    const token = twoFactor.generateToken(req.user.twoFactor.secret);
    res.send(token);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
