const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
// const bcrypt = require("bcrypt")

async function authenticate(username, password, done) {
  try {
    const user = await User.authenticate({ username, password });
    console.log(user.username)
    return done(null, user);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}

passport.use(new LocalStrategy({ usernameField: "username", passwordField: "password" }, authenticate));


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const userDeserialize = await User.findOne({where:{id}})
    return done(null, userDeserialize)
});

module.exports = passport;