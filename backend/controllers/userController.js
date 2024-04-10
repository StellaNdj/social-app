const User = require('../models/userModel');

// Login user
const loginUser = async (req, res) => {
  res.json('Login used');
};

// Sign up user

const signupUser = async (req, res) => {
  res.json('Signup used');
};

module.exports = { loginUser, signupUser }
