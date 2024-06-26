const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' } );
}

// Login user
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }

};

// Sign up user

const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  try {
    const user = await User.signup(email, password, firstName, lastName, username);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

// Get user information
const getUserInfo = async (req, res) => {

  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser, getUserInfo }
