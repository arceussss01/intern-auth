const express = require('express');
const router = express.Router();
const {register, login ,getUsers} = require('../controllers/userControllers');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/getUsers', verifyToken, getUsers);


module.exports = router;