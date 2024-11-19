const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token.split(' ')[1], "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; // Extract the user ID from the token
    next();
  });
};

module.exports = verifyToken;
