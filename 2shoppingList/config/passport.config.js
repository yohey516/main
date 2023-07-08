const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/model')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, cb) {
  User.findById(id).then(user => {
    cb(null, user)
  }).catch(err => {
    cb(err, false)
  })
})

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},function (email, password, cb) {
    User.findOne({ email: email}).
        then(user => {
        if(!user) {
            // console.log("user:", user)
            return cb(null, false, { type: "error", message: "User not found"} )
        }
        //check if password is a match
        if(!user.validPassword(password)){
            // console.log(!user.validPassword(password))
            return cb(null, false, { type: "error", message: "Password not a match"} )
        }
        // console.log("loggedin user: ", user)
        return cb(null, user)
    }).catch(err => {
        cb(err)
    })
}));


module.exports = passport