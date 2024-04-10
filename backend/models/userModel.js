const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;


// User schema
const userSchema = new Schema({
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


// Static signup method
userSchema.statics.signup = async function(email, password, lastName, firstName, username) {

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

// Static login
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });

  if(!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if(!match) {
    throw Error('Incorrect password');
  };

  return user;
}

module.exports = mongoose.model('User', userSchema);
