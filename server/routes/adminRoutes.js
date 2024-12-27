const express = require('express');
const { adminLogin, getAllUsers, allocateSlot } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/users', authMiddleware, getAllUsers);
router.patch('/users/:userId/slot/:slotId', authMiddleware, allocateSlot);

module.exports = router;