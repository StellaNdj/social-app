const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signupSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  }
})

// Schema for login
const loginSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = {
  UserSignup: mongoose.model('UserSignUp', signupSchema),
  UserLogin: mongoose.model('UserLogin', loginSchema)
};
