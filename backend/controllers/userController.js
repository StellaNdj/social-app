const {UserSignup, UserLogin} = require('../models/userModel');


// Login user
const loginUser = async (req, res) => {
  res.json('Login used');
};

// Sign up user

const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  try {
    const user = await UserSignup.signup(email, password, firstName, lastName, username);
    res.status(200).json({email, user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

module.exports = { loginUser, signupUser }
