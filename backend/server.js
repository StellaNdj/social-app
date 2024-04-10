require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});

// Routes
app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

// Connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Server running
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port:', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
