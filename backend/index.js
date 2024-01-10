// backend/index.js
require('dotenv').config();
const config=require('./config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (use your local MongoDB URI)
// Connect to MongoDB using the URI from config.js
mongoose.connect(config.mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
      .then(() => {
        console.log('MongoDB connected');
      })
      .catch((err) => {
        console.error(err.message);
        process.exit(1); // Exit the application if MongoDB connection fails
      });

// Routes
const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');

app.use('/api/users', userRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
