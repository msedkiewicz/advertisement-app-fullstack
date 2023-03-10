const express = require('express');

const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');
const auth = require('../controllers/auth.controller');

router.post('/register', imageUpload.single('avatar'), auth.register);
router.post('/login', auth.login);
router.get('/user', authMiddleware, auth.getUser);
router.delete('/logout', authMiddleware, auth.logout);
router.get('/user/:login', auth.getUserByLogin);

module.exports = router;
