// // // // // // const jwt = require('jsonwebtoken');
// // // // // // const User = require('../models/User');

// // // // // // // Predefined Admin Credentials
// // // // // // const ADMIN_CREDENTIALS = {
// // // // // //   email: 'globalcodingclubkiet@gmail.com',
// // // // // //   password: 'Gcc@2026',
// // // // // // };

// // // // // // // Admin Login Handler
// // // // // // const adminLogin = (req, res) => {
// // // // // //   const { email, password } = req.body;
// // // // // //   if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
// // // // // //     return res.status(401).json({ message: 'Invalid admin credentials' });
// // // // // //   }

// // // // // //   const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // // // // //   res.json({ message: 'Admin logged in successfully', token });
// // // // // // };

// // // // // // // Get All Users (Admin Only)
// // // // // // const getAllUsers = async (req, res) => {
// // // // // //   try {
// // // // // //     const users = await User.find();
// // // // // //     res.json(users);
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: 'Error fetching users', error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // module.exports = { adminLogin, getAllUsers };

// // // // // const jwt = require('jsonwebtoken');
// // // // // const mongoose = require('mongoose');
// // // // // const User = require('../models/User');
// // // // // const Slot = require('../models/Slot');

// // // // // // Predefined Admin Credentials
// // // // // const ADMIN_CREDENTIALS = {
// // // // //   email: 'globalcodingclubkiet@gmail.com',
// // // // //   password: 'Gcc@2026',
// // // // // };

// // // // // // Admin Login Handler
// // // // // const adminLogin = (req, res) => {
// // // // //   const { email, password } = req.body;
// // // // //   if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
// // // // //     return res.status(401).json({ message: 'Invalid admin credentials' });
// // // // //   }

// // // // //   const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // // // //   res.json({ message: 'Admin logged in successfully', token });
// // // // // };

// // // // // // Get All Users (Admin Only)
// // // // // const getAllUsers = async (req, res) => {
// // // // //   try {
// // // // //     const users = await User.find().populate('allocatedSlot');
// // // // //     res.json(users);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: 'Error fetching users', error: err.message });
// // // // //   }
// // // // // };

// // // // // // Allocate Slot to User
// // // // // const allocateSlot = async (req, res) => {
// // // // //   const { userId, slotId } = req.params;

// // // // //   // Validate ObjectId format
// // // // //   if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(slotId)) {
// // // // //     return res.status(400).json({ message: 'Invalid user ID or slot ID format.' });
// // // // //   }

// // // // //   try {
// // // // //     // Check if the slot exists
// // // // //     const slot = await Slot.findById(slotId);
// // // // //     if (!slot) {
// // // // //       return res.status(404).json({ message: 'Slot not found.' });
// // // // //     }

// // // // //     // Check if the user exists
// // // // //     const user = await User.findById(userId);
// // // // //     if (!user) {
// // // // //       return res.status(404).json({ message: 'User not found.' });
// // // // //     }

// // // // //     // Update the user's allocatedSlot
// // // // //     user.allocatedSlot = slotId;
// // // // //     await user.save();

// // // // //     // Add the user to the slot's allocatedUsers
// // // // //     if (!slot.allocatedUsers.includes(userId)) {
// // // // //       slot.allocatedUsers.push(userId);
// // // // //       await slot.save();
// // // // //     }

// // // // //     res.json({ message: 'Slot allocated successfully.', user });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: 'Error allocating slot.', error: err.message });
// // // // //   }
// // // // // };

// // // // // module.exports = { adminLogin, getAllUsers, allocateSlot };
// // // // // controllers/authController.js
// // // // const jwt = require('jsonwebtoken');
// // // // const bcrypt = require('bcryptjs');
// // // // const User = require('../models/User');
// // // // const Slot = require('../models/Slot');

// // // // const generateToken = (id) => {
// // // //     return jwt.sign({ id }, process.env.JWT_SECRET || 'Gcc@2024', {
// // // //         expiresIn: '30d',
// // // //     });
// // // // };

// // // // const registerUser = async (req, res) => {
// // // //     const { name, email, password, isAdmin } = req.body;

// // // //     if (!name || !email || !password) {
// // // //         return res.status(400).json({ message: 'Please provide all required fields' });
// // // //     }

// // // //     const userExists = await User.findOne({ email });
// // // //     if (userExists) {
// // // //         return res.status(400).json({ message: 'User already exists' });
// // // //     }

// // // //     const salt = await bcrypt.genSalt(10);
// // // //     const hashedPassword = await bcrypt.hash(password, salt);

// // // //     const user = await User.create({
// // // //         name,
// // // //         email,
// // // //         password: hashedPassword,
// // // //         isAdmin: isAdmin || false,
// // // //     });

// // // //     if (user) {
// // // //         res.status(201).json({
// // // //             _id: user.id,
// // // //             name: user.name,
// // // //             email: user.email,
// // // //             isAdmin: user.isAdmin,
// // // //             token: generateToken(user._id),
// // // //         });
// // // //     } else {
// // // //         res.status(400).json({ message: 'Failed to create user' });
// // // //     }
// // // // };

// // // // const loginUser = async (req, res) => {
// // // //     const { email, password } = req.body;

// // // //     const user = await User.findOne({ email });

// // // //     if (user && (await bcrypt.compare(password, user.password))) {
// // // //         res.json({
// // // //             _id: user.id,
// // // //             name: user.name,
// // // //             email: user.email,
// // // //             isAdmin: user.isAdmin,
// // // //             token: generateToken(user._id),
// // // //         });
// // // //     } else {
// // // //         res.status(401).json({ message: 'Invalid email or password' });
// // // //     }
// // // // };

// // // // const fetchUsers = async (req, res) => {
// // // //     const users = await User.find({});
// // // //     res.json(users);
// // // // };

// // // // const allocateSlot = async (req, res) => {
// // // //     const { startTime, endTime } = req.body;
// // // //     const user = await User.findById(req.params.id);

// // // //     if (!user) {
// // // //         return res.status(404).json({ message: 'User not found' });
// // // //     }

// // // //     const slot = await Slot.create({
// // // //         user: user._id,
// // // //         startTime,
// // // //         endTime,
// // // //     });

// // // //     user.slot = slot._id;
// // // //     await user.save();

// // // //     res.status(201).json(slot);
// // // // };

// // // // const deallocateSlot = async (req, res) => {
// // // //     const user = await User.findById(req.params.id);

// // // //     if (!user) {
// // // //         return res.status(404).json({ message: 'User not found' });
// // // //     }

// // // //     await Slot.findByIdAndDelete(user.slot);
// // // //     user.slot = null;
// // // //     await user.save();

// // // //     res.json({ message: 'Slot deallocated' });
// // // // };

// // // // module.exports = { registerUser, loginUser, fetchUsers, allocateSlot, deallocateSlot };


// // // const jwt = require('jsonwebtoken');
// // // const bcrypt = require('bcryptjs');
// // // const User = require('../models/User');
// // // const Slot = require('../models/Slot');

// // // const generateToken = (id) => {
// // //     return jwt.sign({ id }, process.env.JWT_SECRET || 'Gcc@2024', {
// // //         expiresIn: '30d',
// // //     });
// // // };

// // // const adminLogin = async (req, res) => {
// // //     const { email, password } = req.body;

// // //     const admin = await User.findOne({ email, role: 'admin' });
// // //     if (admin && (await bcrypt.compare(password, admin.password))) {
// // //         res.json({
// // //             _id: admin.id,
// // //             name: admin.name,
// // //             email: admin.email,
// // //             token: generateToken(admin._id),
// // //         });
// // //     } else {
// // //         res.status(401).json({ message: 'Invalid email or password' });
// // //     }
// // // };

// // // const getAllUsers = async (req, res) => {
// // //     try {
// // //         const users = await User.find({ role: 'user' });
// // //         res.status(200).json(users);
// // //     } catch (error) {
// // //         res.status(500).json({ message: 'Failed to fetch users' });
// // //     }
// // // };

// // // const mongoose = require('mongoose');

// // // const allocateSlot = async (req, res) => {
// // //     const { userId, slotId } = req.params;
// // //     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(slotId)) {
// // //         return res.status(400).json({ message: 'Invalid user ID or slot ID format.' });
// // //     }

// // //     const user = await User.findById(userId);
// // //     if (!user) {
// // //         return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     const slot = await Slot.findById(slotId);
// // //     if (!slot) {
// // //         return res.status(404).json({ message: 'Slot not found' });
// // //     }

// // //     if (slot.allocatedUsers.includes(userId)) {
// // //         return res.status(400).json({ message: 'User already allocated to this slot.' });
// // //     }

// // //     slot.allocatedUsers.push(userId);
// // //     user.allocatedSlot = slotId;

// // //     await slot.save();
// // //     await user.save();

// // //     res.status(200).json({ message: 'Slot allocated successfully', slot });
// // // };


// // // module.exports = { adminLogin, getAllUsers, allocateSlot };



// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcryptjs');
// // const User = require('../models/User');
// // const Slot = require('../models/Slot');
// // const mongoose = require('mongoose');

// // const generateToken = (id) => {
// //   return jwt.sign({ id }, process.env.JWT_SECRET || 'Gcc@2024', {
// //     expiresIn: '30d',
// //   });
// // };

// // const adminLogin = async (req, res) => {
// //   const { email, password } = req.body;

// //   const admin = await User.findOne({ email, role: 'admin' });
// //   if (admin && (await bcrypt.compare(password, admin.password))) {
// //     res.json({
// //       _id: admin.id,
// //       name: admin.name,
// //       email: admin.email,
// //       token: generateToken(admin._id),
// //     });
// //   } else {
// //     res.status(401).json({ message: 'Invalid email or password' });
// //   }
// // };

// // const getAllUsers = async (req, res) => {
// //   try {
// //     const users = await User.find().populate('allocatedSlot');
// //     res.json(users);
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error fetching users', error: err.message });
// //   }
// // };

// // const allocateSlot = async (req, res) => {
// //   const { userId, slotId } = req.params;

// //   if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(slotId)) {
// //     return res.status(400).json({ message: 'Invalid user ID or slot ID format.' });
// //   }

// //   try {
// //     const slot = await Slot.findById(slotId);
// //     if (!slot) {
// //       return res.status(404).json({ message: 'Slot not found.' });
// //     }

// //     const user = await User.findById(userId);
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     if (slot.allocatedUsers.includes(userId)) {
// //       return res.status(400).json({ message: 'User already has a slot allocated.' });
// //     }

// //     slot.allocatedUsers.push(userId);
// //     user.allocatedSlot = slotId;

// //     await slot.save();
// //     await user.save();

// //     res.status(200).json({ message: 'Slot allocated successfully', slot });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error allocating slot.', error: err.message });
// //   }
// // };

// // module.exports = { adminLogin, getAllUsers, allocateSlot };





















// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const Slot = require('../models/Slot');
// const mongoose = require('mongoose');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET || 'Gcc@2024', {
//     expiresIn: '30d',
//   });
// };

// const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   const admin = await User.findOne({ email, role: 'admin' });
//   if (admin && (await bcrypt.compare(password, admin.password))) {
//     res.json({
//       _id: admin.id,
//       name: admin.name,
//       email: admin.email,
//       token: generateToken(admin._id),
//     });
//   } else {
//     res.status(401).json({ message: 'Invalid email or password' });
//   }
// };

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().populate('allocatedSlot');
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching users', error: err.message });
//   }
// };

// const allocateSlot = async (req, res) => {
//   const { userId } = req.params;
//   const { date, time } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: 'Invalid user ID format.' });
//   }

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     const slot = new Slot({
//       examName: 'Exam Slot',
//       date,
//       startTime: time.split('-')[0].trim(),
//       endTime: time.split('-')[1].trim(),
//       allocatedUsers: [userId],
//     });

//     await slot.save();

//     user.allocatedSlot = slot._id;
//     await user.save();

//     res.status(200).json({ message: 'Slot allocated successfully', slot });
//   } catch (err) {
//     res.status(500).json({ message: 'Error allocating slot.', error: err.message });
//   }
// };

// module.exports = { adminLogin, getAllUsers, allocateSlot };







const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Slot = require('../models/Slot');
const mongoose = require('mongoose');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'Gcc@2024', {
    expiresIn: '30d',
  });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, role: 'admin' });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('allocatedSlot');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

const allocateSlot = async (req, res) => {
  const { userId } = req.params;
  const { date, time } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const slot = new Slot({
      examName: 'Exam Slot',
      date,
      startTime: time.split('-')[0].trim(),
      endTime: time.split('-')[1].trim(),
      allocatedUsers: [userId],
    });

    await slot.save();

    user.allocatedSlot = slot._id;
    await user.save();

    res.status(200).json({ message: 'Slot allocated successfully', slot });
  } catch (err) {
    res.status(500).json({ message: 'Error allocating slot.', error: err.message });
  }
};

module.exports = { adminLogin, getAllUsers, allocateSlot };