const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
// const bcrypt = require("bcrypt")

authenticatePlayer = async(username, password, done) => {
  try {
    const user = await User.authenticatePlayer({ username, password });
    return done(null, user);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}
authenticateAdmin = async(username, password, done) => {
  try {
    const user = await User.authenticateAdmin({ username, password });
    return done(null, user);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}

passport.use('player', new LocalStrategy({ usernameField: "username", passwordField: "password" }, authenticatePlayer));
passport.use('admin', new LocalStrategy({ usernameField: "username", passwordField: "password" }, authenticateAdmin));


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const userDeserialize = await User.findOne({where:{id}})
    return done(null, userDeserialize)
});

module.exports = passport;