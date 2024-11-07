// authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devashish');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token Verification Error:', err.message);
    res.status(401).json({ error: 'Token invalid' });
  }
};

export default authMiddleware;