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
    const user_id = req.user._id;
    const user = req.user;
    const post = await Post.create({content, user: user});

    console.log(post);
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

// UPDATE a post

const updatePostCounters = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such post'});
  };

  let updatedPost;

  if (action === 'like') {
    updatedPost = await Post.findByIdAndUpdate(
      {_id: id},
      { $inc: { likes: 1 } },
      { new: true }
    );
  } else if (action === 'dislike') {
    updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { dislikes: 1 } },
      { new: true }
    );
  } else {
    return res.status(400).json({ error: 'Invalid action' });
  }

  if (!updatedPost) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.status(200).json(updatedPost)
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePostCounters
}
