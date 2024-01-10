// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing Token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken; // Attach user information to the request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
  }
};

module.exports = authMiddleware;
