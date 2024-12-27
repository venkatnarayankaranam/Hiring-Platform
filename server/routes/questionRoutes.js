const express = require('express');
const { addQuestion, getQuestions } = require('../controllers/questionController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/add', authMiddleware, addQuestion);
router.get('/', authMiddleware, getQuestions);

module.exports = router;
