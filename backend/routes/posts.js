const express = require('express');
const { createPost, getPost, getPosts, deletePost } = require('../controllers/postController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Fire middleware function
router.use(requireAuth);

// GET all posts
router.get('/', getPosts);

// GET a single post
router.get('/:id', getPost);

// POST a new post
router.post('/', createPost);

// DELETE a post
router.delete('/:id', deletePost);

// UPDATE
router.patch('/:id', (req, res) => {
  res.json('UPDATE a post');
})


module.exports = router;
