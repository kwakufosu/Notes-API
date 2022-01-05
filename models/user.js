const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,

    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password must not include "password"');
      } else if (value.length < 8) {
        throw new Error('Password must be 8 characters or more');
      }
    },
  },
});
userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }
  const decryptPass = await bcrypt.compare(password, user.password);
  if (decryptPass === false) {
    throw new Error('Invalid credentials');
  }

  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
