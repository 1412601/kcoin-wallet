const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const twoFactor = require("node-2fa");
const key = require("../config/key");
const axios = require("../utils/axiosHelper");
const mongoose = require("mongoose");

const User = mongoose.model("users");
const Wallet = mongoose.model("wallets");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: key.googleClientID,
      clientSecret: key.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const secret = twoFactor.generateSecret({
        name: "kcoin-wallet",
        account: profile.emails[0].value
      });

      const user = await new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        twoFactor: secret
      }).save();

      //Create wallet
      const { data } = await axios.get("/generate-address");
      const { publicKey, privateKey, address } = data;

      await new Wallet({
        _user: user.id,
        publicKey,
        privateKey,
        address
      }).save();

      done(null, user);
    }
  )
);
