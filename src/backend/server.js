// src/backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import authMiddleware from './authMiddleware.js'; // [./authMiddleware.js](src/backend/authMiddleware.js)
import { connectDB } from './config/db.js'; // [./config/db.js](src/backend/config/db.js)
import physicsRoutes from './routes/physicsRoutes.js'; // [./routes/physicsRoutes.js](src/backend/routes/physicsRoutes.js)
import chemistryRoutes from './routes/chemistryRoutes.js'; // [./routes/chemistryRoutes.js](src/backend/routes/chemistryRoutes.js)
import mathsRoutes from './routes/mathsRoutes.js'; // [./routes/mathsRoutes.js](src/backend/routes/mathsRoutes.js)
// Import other routes as needed

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
// Allowed origins

const cors = require('cors');

app.use(cors({
  origin: '*'
}));


// Connect to MongoDB
connectDB();
app.use(express.json());
// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Routes

/**
 * @route POST /api/signup
 * @desc Register a new user
 * @access Public
 */
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route POST /api/login
 * @desc Authenticate user and get token
 * @access Public
 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'devashish', // Ensure you have JWT_SECRET in your environment variables
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('JWT Sign Error:', err);
          return res.status(500).send('Server error');
        }
        res.json({ token });
      }
    );

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route GET /api/verify
 * @desc Verify JWT Token
 * @access Private
 */
app.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET || 'devashish', (err, decoded) => { // Ensure JWT_SECRET matches
    if (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }
    res.status(200).json({ message: 'Token verified', user: decoded.user });
  });
});

/**
 * @route GET /api/profile
 * @desc Get user profile
 * @access Private
 */
app.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (err) {
    console.error('Profile Fetch Error:', err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route PUT /api/profile
 * @desc Update user profile
 * @access Private
 */
app.put('/profile', authMiddleware, async (req, res) => {
  const { username } = req.body;

  // Build profile object
  const profileFields = {};
  if (username) profileFields.username = username;
  // Add other fields as needed

  try {
    let user = await User.findById(req.user.id);

    if (user) {
      // Update
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: profileFields },
        { new: true }
      ).select('-password');

      return res.json({ user });
    }

    res.status(400).json({ error: 'User not found' });
  } catch (err) {
    console.error('Profile Update Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Other Routes
app.use('/physics', physicsRoutes); // [./routes/physicsRoutes.js](src/backend/routes/physicsRoutes.js)
app.use('/chemistry', chemistryRoutes); // [./routes/chemistryRoutes.js](src/backend/routes/chemistryRoutes.js)
app.use('/maths', mathsRoutes); // [./routes/mathsRoutes.js](src/backend/routes/mathsRoutes.js)
// Use other routes as needed

// Root Endpoint
app.get('/', (req, res) => {
    res.send('JEE Mains PYQ API');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
