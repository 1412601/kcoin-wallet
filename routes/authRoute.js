const mongoose = require("mongoose");
const User = mongoose.model("users");
const Mailer = require("../services/Mailer");
const ActivationMailTemplate = require("../services/emailTemplate/activationEmail");
const passport = require("passport");

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

  app.post("/api/email/activate", async (req, res) => {
    const subject = "KCoin activation email";
    const recipients = [{ email: req.user.email }];

    try {
      const mailer = new Mailer(
        { subject, recipients },
        ActivationMailTemplate(req.user.id)
      );
      await mailer.send();
      res.send({ err: "Mail sent. Check email" });
    } catch (err) {
      res.send("Failed to sent mail.");
    }
  });

  app.get("/api/user/:id/activate", async (req, res) => {
    const user = await User.findById(req.params.id, "isActivated");
    if (user) {
      const { isActivated } = user;
      if (isActivated) {
        res.send({ msg: "User is already activated." });
      } else {
        user.isActivated = true;
        await user.save();
        res.send({ msg: "Activation is successfull." });
      }
    } else res.send({ msg: "User not found" });
  });
};
