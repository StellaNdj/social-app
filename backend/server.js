require('dotenv').config();
const express = require('express');

const postsRoutes = require('./routes/posts');

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

// Server running
app.listen(process.env.PORT, () => {
  console.log('Server is running on port:', process.env.PORT);
});
 