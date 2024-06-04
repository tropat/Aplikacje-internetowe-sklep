const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const _generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
}

const addUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Credentials cannot be empty' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role });
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: `User with ID ${id} not found` });
    }
    res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const origin = req.headers.origin || req.headers.referer;
    const clientRole = origin.includes('3000') ? 'client' : (origin.includes('3001') ? 'deliverer' : null);

    if (!clientRole || user.role !== clientRole) {
      return res.status(403).json({ error: 'Access forbidden: insufficient role' });
    }

    const accessToken = _generateAccessToken(user);

    res.status(200).json({ message: 'Authentication successful', accessToken: accessToken, id: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Authentication unsuccessful' });
  }
};

module.exports = {
  addUser,
  getUserById,
  getAuth,
};
