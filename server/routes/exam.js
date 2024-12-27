const express = require('express');
const { submitExam } = require('../controllers/examController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/submit', authMiddleware, submitExam);

module.exports = router;