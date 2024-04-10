const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;


// Signup schema
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

// Static signup method
signupSchema.statics.signup = async function(email, password, lastName, firstName, username) {

  // Validation
  if(!email || !password || !lastName || !firstName || !username ) {
    throw Error('All the fields must be filled');
  };

  if(!validator.isEmail(email)) {
    throw Error('Email is not valid');
  };

  if(!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough, must contain capitals, number and speical character');
  }

  // Check that email is not in use
  const exists = await this.findOne({ email });

  if(exists) {
    throw Error('Email already in use');
  }

  // Hash the password for safety
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, lastName, firstName, username});

  return user;
}

module.exports = {
  UserSignup: mongoose.model('UserSignup', signupSchema),
  UserLogin: mongoose.model('UserLogin', loginSchema)
};
