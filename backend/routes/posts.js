const express = require('express');
const router = express.Router();

// GET all posts
router.get('/', (req, res) => {
  res.json('GET all the posts')
});

// GET a single post
router.get('/:id', (req, res) => {
  res.json('GET a single post');
})

// POST a new post
router.post('/', (req, res) => {
  res.json('POST a new post')
})

// DELETE a post
router.delete('/:id', (req, res) => {
  res.json('DELETE a post')
});

// UPDATE
router.patch('/:id', (req, res) => {
  res.json('UPDATE a post')
})


module.exports = router;
