// // const express = require('express');
// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcryptjs');
// // const User = require('../models/User');
// // const router = express.Router();

// // // Predefined Admin Credentials
// // const ADMIN_CREDENTIALS = {
// //   email: 'globalcodingclubkiet@gmail.com',
// //   password: 'Gcc@2026',
// // };

// // // User Registration Route
// // router.post('/register', async (req, res) => {
// //   const { name, email, password, rollno, fatherName, college, branch, gender, dob } = req.body;

// //   try {
// //     // Check if user already exists
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User already exists' });
// //     }

// //     // Hash the password before saving
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create a new user and save it to the database
// //     const user = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       rollno,
// //       fatherName,
// //       college,
// //       branch,
// //       gender,
// //       dob,
// //     });

// //     await user.save();
// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error registering user', error: error.message });
// //   }
// // });

// // // User Login Route (Admin and User Authentication)
// // router.post('/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Admin login check
// //     if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
// //       const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //       return res.json({ token, role: 'admin', message: 'Admin login successful' });
// //     }

// //     // User login check
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(401).json({ message: 'Invalid user credentials: User not found' });
// //     }

// //     // Compare the password with the hashed password stored in the database
// //     const isPasswordValid = await bcrypt.compare(password, user.password);
// //     if (!isPasswordValid) {
// //       return res.status(401).json({ message: 'Invalid user credentials: Incorrect password' });
// //     }

// //     // Generate a JWT token for user
// //     const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //     res.json({ token, role: 'user', message: 'User login successful' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Login error', error: err.message });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const Slot = require('../models/Slot');
// const router = express.Router();

// // Predefined Admin Credentials
// const ADMIN_CREDENTIALS = {
//   email: 'globalcodingclubkiet@gmail.com',
//   password: 'Gcc@2026',
// };

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

// // User Registration Route
// router.post('/register', async (req, res) => {
//   const { name, email, password, rollno, fatherName, college, branch, gender, dob } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       rollno,
//       fatherName,
//       college,
//       branch,
//       gender,
//       dob,
//     });

//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error: error.message });
//   }
// });

// // User Login Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
//       const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       return res.json({ token, role: 'admin', message: 'Admin login successful' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid user credentials: User not found' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid user credentials: Incorrect password' });
//     }

//     const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, role: 'user', message: 'User login successful' });
//   } catch (err) {
//     res.status(500).json({ message: 'Login error', error: err.message });
//   }
// });

// // Get User Profile
// router.get('/profile', verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate('allocatedSlot');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ user });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching profile', error: err.message });
//   }
// });

// // Admin: Allocate Slot to a User
// router.patch('/users/:id/slot', verifyToken, verifyAdmin, async (req, res) => {
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

//     user.allocatedSlot = slot._id;
//     slot.allocatedUsers.push(user._id);

//     await user.save();
//     await slot.save();

//     res.json({ message: 'Slot allocated successfully', user, slot });
//   } catch (err) {
//     res.status(500).json({ message: 'Error allocating slot', error: err.message });
//   }
// });

// // Admin: Deallocate Slot from a User
// router.patch('/users/:id/slot/deallocate', verifyToken, verifyAdmin, async (req, res) => {
//   const { id: userId } = req.params;

//   try {
//     const user = await User.findById(userId).populate('allocatedSlot');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (!user.allocatedSlot) {
//       return res.status(400).json({ message: 'User does not have a slot allocated.' });
//     }

//     const slot = await Slot.findById(user.allocatedSlot);
//     slot.allocatedUsers = slot.allocatedUsers.filter((uid) => uid.toString() !== user._id.toString());

//     user.allocatedSlot = null;

//     await user.save();
//     await slot.save();

//     res.json({ message: 'Slot deallocated successfully', user, slot });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deallocating slot', error: err.message });
//   }
// });

// module.exports = router;

















const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Slot = require('../models/Slot');
const router = express.Router();

const ADMIN_CREDENTIALS = {
  email: 'globalcodingclubkiet@gmail.com',
  password: 'Gcc@2026',
};

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
  try {
    const slot = await Slot.findById(req.body.slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found.' });
    req.slotDoc = slot;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving slot.', error: err.message });
  }
};

router.post('/register', async (req, res) => {
  const { name, email, password, rollno, fatherName, college, branch, gender, dob } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      rollno,
      fatherName,
      college,
      branch,
      gender,
      dob,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, role: 'admin', message: 'Admin login successful.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid user credentials: User not found.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid user credentials: Incorrect password.' });
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: 'user', message: 'User login successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Login error.', error: err.message });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('allocatedSlot');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile.', error: err.message });
  }
});

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
