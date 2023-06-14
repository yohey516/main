const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  items: [
    {
      name: String,
      quantity: Number,
      image: String
    }
  ],
});


// Use Bcrypt to hash password before it's saved.
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    user.password = bcrypt.hashSync(user.password, 10);
    next();
  });
  

// Check password to existing one
  userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  module.exports = mongoose.model("User", userSchema);
