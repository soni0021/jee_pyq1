// src/backend/index.js
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import authMiddleware from './authMiddleware.js'; // Ensure you have this middleware
// Hardcoded Configuration Variables
const MONGO_URI = 'mongodb+srv://devashishsoni2004:Soni%402004@cluster0.0f2jp.mongodb.net/user'; // Replace with your actual MongoDB URI
const PORT = 5012; // Replace with your desired port number
const JWT_SECRET = 'devashish'; // Replace with your actual JWT secret

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debugging: Log the MONGO_URI
console.log('MONGO_URI:', MONGO_URI);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if unable to connect
  });

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
      JWT_SECRET, // Use the hardcoded JWT_SECRET
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

  jwt.verify(token, JWT_SECRET, (err, decoded) => { // Use the hardcoded JWT_SECRET
    if (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }
    res.status(200).json({ message: 'Token verified', user: decoded.user });
  });
});
// src/backend/index.js
// ... existing imports and code ...



// Define Profile Routes

/**
 * @route GET /api/profile
 * @desc Get user profile
 * @access Private
 */
app.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
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
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});