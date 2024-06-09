const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  const secretKey = process.env.ACCESS_TOKEN_SECRET;

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeServer = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  const secretKey = process.env.SERVER_ACCESS_TOKEN_SECRET;

  jwt.verify(token, secretKey, (err, server) => {
    if (err) return res.sendStatus(403);
    req.server = server;
    next();
  });
};

module.exports = {
  authenticateToken,
  authorizeServer,
};
