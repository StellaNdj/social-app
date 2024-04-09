const express = require('express');
const { createPost, getPost, getPosts } = require('../controllers/postController');

const router = express.Router();

// GET all posts
router.get('/', getPosts);

// GET a single post
router.get('/:id', getPost); 

// POST a new post
router.post('/', createPost);

// DELETE a post
router.delete('/:id', (req, res) => {
  res.json('DELETE a post');
});

// UPDATE
router.patch('/:id', (req, res) => {
  res.json('UPDATE a post');
})


module.exports = router;
