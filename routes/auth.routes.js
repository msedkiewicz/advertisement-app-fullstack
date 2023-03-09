const express = require('express');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

const auth = require('../controllers/auth.controller');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/user', authMiddleware, auth.getUser);
router.delete('/logout', authMiddleware, auth.logout);
module.exports = router;
