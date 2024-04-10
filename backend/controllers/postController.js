const Post = require('../models/postModel');
const mongoose = require('mongoose')

// Get all posts
const getPosts = async (req, res) => {
  const posts = await Post.find({}).sort({createdAt: -1});

  res.status(200).json(posts);
}

// Get a single post
const getPost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such post'});
  }

  const post = await Post.findById(id);

  if(!post) {
    return res.status(400).json({error: 'No such post'});
  };

  res.status(200).json(post);
}

// Create a new post
const createPost = async (req, res) => {
  const { content } = req.body;

  // Add post to db
  try {
    const post = await Post.create({content});
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such post'});
  };

  const post = await Post.findOneAndDelete({_id: id});

  if(!post) {
    return res.status(400).json({error: 'No such post'});
  };

  res.status(200).json(post);

}

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost
}
