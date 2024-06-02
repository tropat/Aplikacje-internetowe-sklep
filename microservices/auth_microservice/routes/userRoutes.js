const express = require('express');
const {
  addUser,
  getUserById,
  getAuth,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', addUser);
router.get('/:id', getUserById);
router.post('/login', getAuth);

module.exports = router;
