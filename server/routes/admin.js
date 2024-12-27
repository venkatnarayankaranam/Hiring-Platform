// const express = require('express');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// // Middleware to verify admin role
// const verifyAdmin = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied. Admins only.' });
//     }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// // Allocate a slot to a user
// router.patch('/users/:id/slot', verifyAdmin, async (req, res) => {
//   const { id: userId } = req.params;
//   const { slotId } = req.body;

//   try {
//     const slot = await Slot.findById(slotId);
//     if (!slot) return res.status(404).json({ message: 'Slot not found' });

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (user.allocatedSlot) {
//       return res.status(400).json({ message: 'User already has a slot allocated.' });
//     }

//     // Update user and slot
//     user.allocatedSlot = slot._id;
//     slot.allocatedUsers.push(user._id);

//     await user.save();
//     await slot.save();

//     res.json({ message: 'Slot allocated successfully', user, slot });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error allocating slot', error: err.message });
//   }
// });


// // Get all registered users
// router.get('/users', verifyAdmin, async (req, res) => {
//   try {
//     const users = await User.find().select('-password'); // Don't include password in response
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching users', error: err.message });
//   }
// });

// // Delete a user
// router.delete('/users/:id', verifyAdmin, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting user', error: err.message });
//   }
// });

// // Update a user
// router.put('/users/:id', verifyAdmin, async (req, res) => {
//   const { name, email, role, marks } = req.body;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, role, marks },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(updatedUser);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error updating user', error: err.message });
//   }
// });

// module.exports = router;]

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const User = require('../models/User');
// const Slot = require('../models/Slot');
// const router = express.Router();

// // Middleware to verify token and attach user info
// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// // Middleware to verify admin role
// const verifyAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied. Admins only.' });
//   }
//   next();
// };

// // Middleware to validate if slotId is a valid ObjectId
// const validateSlotId = (slotId) => {
//   return mongoose.Types.ObjectId.isValid(slotId);  // Check if the slotId is valid
// };

// // Middleware to retrieve user by ID
// const fetchUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id).populate('allocatedSlot');
//     if (!user) return res.status(404).json({ message: 'User not found.' });
//     req.userDoc = user;
//     next();
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving user.', error: err.message });
//   }
// };

// // Middleware to retrieve slot by ID (corrected conversion to ObjectId)
// const fetchSlot = async (req, res, next) => {
//   const { slotId } = req.body;
  
//   if (!validateSlotId(slotId)) {
//     return res.status(400).json({ message: 'Invalid slot ID format.' });
//   }

//   try {
//     const slot = await Slot.findById(slotId);
//     if (!slot) return res.status(404).json({ message: 'Slot not found.' });
//     req.slotDoc = slot;
//     next();
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving slot.', error: err.message });
//   }
// };

// // Admin: Allocate Slot to a User
// router.patch('/users/:id/slot', verifyToken, verifyAdmin, fetchUser, fetchSlot, async (req, res) => {
//   const { userDoc, slotDoc } = req;

//   try {
//     if (userDoc.allocatedSlot) {
//       return res.status(400).json({ message: 'User already has a slot allocated.' });
//     }

//     userDoc.allocatedSlot = slotDoc._id;
//     slotDoc.allocatedUsers.push(userDoc._id);

//     await userDoc.save();
//     await slotDoc.save();

//     res.json({ message: 'Slot allocated successfully.', user: userDoc, slot: slotDoc });
//   } catch (err) {
//     res.status(500).json({ message: 'Error allocating slot.', error: err.message });
//   }
// });

// // Admin: Deallocate Slot from a User
// router.patch('/users/:id/slot/deallocate', verifyToken, verifyAdmin, fetchUser, async (req, res) => {
//   const { userDoc } = req;

//   try {
//     if (!userDoc.allocatedSlot) {
//       return res.status(400).json({ message: 'User does not have a slot allocated.' });
//     }

//     const slot = await Slot.findById(userDoc.allocatedSlot);
//     slot.allocatedUsers = slot.allocatedUsers.filter((uid) => uid.toString() !== userDoc._id.toString());

//     userDoc.allocatedSlot = null;

//     await userDoc.save();
//     await slot.save();

//     res.json({ message: 'Slot deallocated successfully.', user: userDoc, slot });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deallocating slot.', error: err.message });
//   }
// });

// module.exports = router;































const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const Slot = require('../models/Slot');
const router = express.Router();


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Gcc@2024'); // Default secret for local testing
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};


const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

const validateSlotId = (slotId) => mongoose.Types.ObjectId.isValid(slotId);

const fetchUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('allocatedSlot');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    req.userDoc = user;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user.', error: err.message });
  }
};

const fetchSlot = async (req, res, next) => {
  const { slotId } = req.body;

  if (!validateSlotId(slotId)) {
    return res.status(400).json({ message: 'Invalid slot ID format.' });
  }

  try {
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found.' });
    req.slotDoc = slot;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving slot.', error: err.message });
  }
};

router.patch('/users/:id/slot', verifyToken, verifyAdmin, fetchUser, fetchSlot, async (req, res) => {
  const { userDoc, slotDoc } = req;

  try {
    if (userDoc.allocatedSlot) {
      return res.status(400).json({ message: 'User already has a slot allocated.' });
    }

    userDoc.allocatedSlot = slotDoc._id;
    slotDoc.allocatedUsers.push(userDoc._id);

    await userDoc.save();
    await slotDoc.save();

    res.json({ message: 'Slot allocated successfully.', user: userDoc, slot: slotDoc });
  } catch (err) {
    res.status(500).json({ message: 'Error allocating slot.', error: err.message });
  }
});

router.patch('/users/:id/slot/deallocate', verifyToken, verifyAdmin, fetchUser, async (req, res) => {
  const { userDoc } = req;

  try {
    if (!userDoc.allocatedSlot) {
      return res.status(400).json({ message: 'User does not have a slot allocated.' });
    }

    const slot = await Slot.findById(userDoc.allocatedSlot);
    slot.allocatedUsers = slot.allocatedUsers.filter((uid) => uid.toString() !== userDoc._id.toString());

    userDoc.allocatedSlot = null;

    await userDoc.save();
    await slot.save();

    res.json({ message: 'Slot deallocated successfully.', user: userDoc, slot });
  } catch (err) {
    res.status(500).json({ message: 'Error deallocating slot.', error: err.message });
  }
});

module.exports = router;
