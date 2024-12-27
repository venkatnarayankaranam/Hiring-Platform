// // // // // // // // const express = require('express');
// // // // // // // // const User = require('../models/User');
// // // // // // // // const multer = require('multer');
// // // // // // // // const jwt = require('jsonwebtoken');
// // // // // // // // const path = require('path');
// // // // // // // // const fs = require('fs');
// // // // // // // // const dotenv = require('dotenv');

// // // // // // // // dotenv.config();
// // // // // // // // const router = express.Router();


// // // // // // // // const storage = multer.diskStorage({
// // // // // // // //   destination: (req, file, cb) => {
// // // // // // // //     const uploadPath = path.join(__dirname, '../uploads');
// // // // // // // //     if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
// // // // // // // //     cb(null, uploadPath);
// // // // // // // //   },
// // // // // // // //   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// // // // // // // // });

// // // // // // // // const upload = multer({
// // // // // // // //   storage,
// // // // // // // //   limits: { fileSize: 5 * 1024 * 1024 }, 
// // // // // // // //   fileFilter: (req, file, cb) => {
// // // // // // // //     const allowedTypes = /jpeg|jpg|png/;
// // // // // // // //     const isValidType = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// // // // // // // //     cb(isValidType ? null : new Error('Only .jpeg, .jpg, and .png formats allowed!'));
// // // // // // // //   },
// // // // // // // // });


// // // // // // // // const authMiddleware = (req, res, next) => {
// // // // // // // //   const token = req.headers.authorization?.split(' ')[1];
// // // // // // // //   if (!token) return res.status(401).json({ message: 'Unauthorized' });

// // // // // // // //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// // // // // // // //     if (err) return res.status(401).json({ message: 'Unauthorized' });
// // // // // // // //     req.userId = decoded.id;
// // // // // // // //     next();
// // // // // // // //   });
// // // // // // // // };


// // // // // // // // router.get('/', authMiddleware, async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const user = await User.findById(req.userId).select('-password');
// // // // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });
// // // // // // // //     res.json(user);
// // // // // // // //   } catch (error) {
// // // // // // // //     res.status(500).json({ message: 'Server error', error: error.message });
// // // // // // // //   }
// // // // // // // // });


// // // // // // // // router.put('/', authMiddleware, upload.single('avatar'), async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const updatedData = { ...req.body };

// // // // // // // //     if (req.file) {
// // // // // // // //       updatedData.avatar = `/uploads/${req.file.filename}`;
// // // // // // // //     }

// // // // // // // //     const allowedFields = ['firstName', 'lastName', 'gender', 'dob', 'email', 'mobile', 'address', 'avatar'];
// // // // // // // //     Object.keys(updatedData).forEach((key) => {
// // // // // // // //       if (!allowedFields.includes(key)) delete updatedData[key];
// // // // // // // //     });

// // // // // // // //     const user = await User.findByIdAndUpdate(req.userId, updatedData, { new: true }).select('-password');
// // // // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // // // //     res.json(user);
// // // // // // // //   } catch (error) {
// // // // // // // //     res.status(500).json({ message: 'Server error', error: error.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // module.exports = router;
// // // // // // // const express = require('express');
// // // // // // // const User = require('../models/User');
// // // // // // // const ExamSlot = require('../models/ExamSlot');  // Import ExamSlot model
// // // // // // // const router = express.Router();

// // // // // // // const authMiddleware = (req, res, next) => {
// // // // // // //   const token = req.headers.authorization?.split(' ')[1];
// // // // // // //   if (!token) return res.status(401).json({ message: 'Unauthorized' });

// // // // // // //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// // // // // // //     if (err) return res.status(401).json({ message: 'Unauthorized' });
// // // // // // //     req.userId = decoded.id;
// // // // // // //     next();
// // // // // // //   });
// // // // // // // };

// // // // // // // // Fetch user profile with booked slot information
// // // // // // // router.get('/', authMiddleware, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const user = await User.findById(req.userId).select('-password');
// // // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // // //     // Fetch the user's booked exam slot (if any)
// // // // // // //     const bookedSlot = await ExamSlot.findOne({ userId: req.userId, isBooked: true });

// // // // // // //     // Send both user details and slot information in the response
// // // // // // //     res.json({
// // // // // // //       user: user,
// // // // // // //       bookedSlot: bookedSlot || null,  // If no booked slot, return null
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).json({ message: 'Server error', error: error.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // module.exports = router;
// // // // // // const express = require('express');
// // // // // // const User = require('../models/User');
// // // // // // const ExamSlot = require('../models/ExamSlot');  // Import ExamSlot model
// // // // // // const jwt = require('jsonwebtoken');  // <-- Import jwt here
// // // // // // const router = express.Router();

// // // // // // const authMiddleware = (req, res, next) => {
// // // // // //   const token = req.headers.authorization?.split(' ')[1];
// // // // // //   if (!token) return res.status(401).json({ message: 'Unauthorized' });

// // // // // //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// // // // // //     if (err) return res.status(401).json({ message: 'Unauthorized' });
// // // // // //     req.userId = decoded.id;
// // // // // //     next();
// // // // // //   });
// // // // // // };

// // // // // // // Fetch user profile with booked slot information
// // // // // // router.get('/', authMiddleware, async (req, res) => {
// // // // // //   try {
// // // // // //     const user = await User.findById(req.userId).select('-password');
// // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // //     // Fetch the user's booked exam slot (if any)
// // // // // //     const bookedSlot = await ExamSlot.findOne({ userId: req.userId, isBooked: true });

// // // // // //     // Send both user details and slot information in the response
// // // // // //     res.json({
// // // // // //       user: user,
// // // // // //       bookedSlot: bookedSlot || null,  // If no booked slot, return null
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ message: 'Server error', error: error.message });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;
// // // // // const express = require('express');
// // // // // const jwt = require('jsonwebtoken');  // Import jsonwebtoken here
// // // // // const User = require('../models/User');
// // // // // const authMiddleware = require('../middlewares/authMiddleware'); // Ensure middleware is properly placed

// // // // // const router = express.Router();

// // // // // // Middleware to check if the user is authenticated
// // // // // const authMiddleware = (req, res, next) => {
// // // // //   const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

// // // // //   if (!token) {
// // // // //     return res.status(401).json({ message: 'Unauthorized' });
// // // // //   }

// // // // //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// // // // //     if (err) {
// // // // //       return res.status(401).json({ message: 'Unauthorized' });
// // // // //     }
// // // // //     req.userId = decoded.id; // Attach the user ID to the request object
// // // // //     next();
// // // // //   });
// // // // // };

// // // // // // Route to get user profile
// // // // // router.get('/', authMiddleware, async (req, res) => {
// // // // //   try {
// // // // //     const user = await User.findById(req.userId).select('-password');  // Fetch user data excluding password
// // // // //     if (!user) return res.status(404).json({ message: 'User not found' });
    
// // // // //     // Fetch the slot details as well, if user has booked any slot
// // // // //     const bookedSlot = await ExamSlot.findOne({ userId: req.userId });
    
// // // // //     res.json({
// // // // //       user,
// // // // //       bookedSlot: bookedSlot ? bookedSlot : null,  // Return booked slot details if available
// // // // //     });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ message: 'Server error', error: error.message });
// // // // //   }
// // // // // });

// // // // // module.exports = router;
// // // // const express = require('express');
// // // // const jwt = require('jsonwebtoken');
// // // // const ExamSlot = require('../models/ExamSlot');  // Import your ExamSlot model
// // // // const User = require('../models/User');  // Import your User model if needed for any checks
// // // // const router = express.Router();

// // // // // Middleware to authenticate the JWT token (Add this for protected routes)
// // // // const authMiddleware = (req, res, next) => {
// // // //   const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

// // // //   if (!token) {
// // // //     return res.status(401).json({ message: 'Unauthorized: No token provided' });
// // // //   }

// // // //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// // // //     if (err) {
// // // //       return res.status(401).json({ message: 'Unauthorized: Invalid token' });
// // // //     }
// // // //     req.userId = decoded.id; // Attach the user ID to the request object
// // // //     next();
// // // //   });
// // // // };

// // // // // Route to create a time slot for a specific exam date and time
// // // // router.post('/create', async (req, res) => {
// // // //   const { examDate, time } = req.body;

// // // //   if (!examDate || !time) {
// // // //     return res.status(400).json({ message: 'Exam date and time are required.' });
// // // //   }

// // // //   try {
// // // //     // Check if a slot for this exam date and time already exists
// // // //     const existingSlot = await ExamSlot.findOne({ examDate, time });

// // // //     if (existingSlot) {
// // // //       // If a slot already exists for this date and time, return the existing slot
// // // //       return res.status(200).json({
// // // //         message: 'Slot already exists.',
// // // //         slot: existingSlot,
// // // //       });
// // // //     }

// // // //     // Create a new slot if it doesn't exist
// // // //     const newSlot = new ExamSlot({
// // // //       examDate,
// // // //       time,
// // // //       isBooked: false,  // Initially not booked
// // // //       userId: null,     // No user has booked this slot yet
// // // //       userName: null,   // No user info yet
// // // //       userEmail: null,  // No user info yet
// // // //     });

// // // //     const savedSlot = await newSlot.save();

// // // //     return res.status(201).json({
// // // //       message: 'Slot created successfully.',
// // // //       slot: savedSlot,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error('Error creating slot:', error);
// // // //     return res.status(500).json({ message: 'Error creating slot. Please try again.', error: error.message });
// // // //   }
// // // // });

// // // // // Route to book a time slot for a user (protected route)
// // // // router.post('/book', authMiddleware, async (req, res) => {
// // // //   const { userName, userEmail, examDate, time } = req.body;

// // // //   if (!userName || !userEmail || !examDate || !time) {
// // // //     return res.status(400).json({ message: 'User name, email, exam date, and time are required.' });
// // // //   }

// // // //   try {
// // // //     // Find the first available slot for the selected exam date and time
// // // //     const availableSlot = await ExamSlot.findOne({ examDate, time, isBooked: false });

// // // //     if (!availableSlot) {
// // // //       return res.status(400).json({ message: 'No available slots for the selected date and time.' });
// // // //     }

// // // //     // Check if the user has already booked a slot for this exam date
// // // //     const existingBooking = await ExamSlot.findOne({ userId: req.userId, examDate });
// // // //     if (existingBooking) {
// // // //       return res.status(400).json({ message: 'You have already booked a slot for this exam date.' });
// // // //     }

// // // //     // Mark the slot as booked and assign the user info (userId, userName, userEmail)
// // // //     availableSlot.isBooked = true;
// // // //     availableSlot.userId = req.userId;  // Use authenticated user's ID
// // // //     availableSlot.userName = userName;
// // // //     availableSlot.userEmail = userEmail;

// // // //     // Save the updated slot to the database
// // // //     const updatedSlot = await availableSlot.save();

// // // //     return res.status(200).json({
// // // //       message: 'Slot booked successfully!',
// // // //       slot: updatedSlot,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error('Error booking slot:', error);
// // // //     return res.status(500).json({ message: 'Error booking slot. Please try again.', error: error.message });
// // // //   }
// // // // });

// // // // // Route to get all available slots for a specific exam date and time
// // // // router.get('/availableSlots', async (req, res) => {
// // // //   const { examDate, time } = req.query;

// // // //   if (!examDate || !time) {
// // // //     return res.status(400).json({ message: 'Exam date and time are required.' });
// // // //   }

// // // //   try {
// // // //     // Fetch all available slots for the selected exam date and time
// // // //     const availableSlots = await ExamSlot.find({ examDate, time, isBooked: false });

// // // //     if (availableSlots.length === 0) {
// // // //       return res.status(404).json({ message: 'No available slots for the selected date and time.' });
// // // //     }

// // // //     return res.status(200).json({ availableSlots });
// // // //   } catch (error) {
// // // //     console.error('Error fetching available slots:', error);
// // // //     return res.status(500).json({ message: 'Error fetching available slots.', error: error.message });
// // // //   }
// // // // });

// // // // // Route to get the booked slot for a user (protected route)
// // // // router.get('/userBooking', authMiddleware, async (req, res) => {
// // // //   const { userId } = req;

// // // //   try {
// // // //     // Fetch the slot booked by the user
// // // //     const userSlot = await ExamSlot.findOne({ userId });

// // // //     if (!userSlot) {
// // // //       return res.status(404).json({ message: 'User has not booked any slot.' });
// // // //     }

// // // //     return res.status(200).json({
// // // //       message: 'User has booked the following slot:',
// // // //       slot: userSlot,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error('Error fetching user booking:', error);
// // // //     return res.status(500).json({ message: 'Error fetching user booking.', error: error.message });
// // // //   }
// // // // });

// // // // module.exports = router;
// // // const express = require('express');
// // // const router = express.Router();
// // // const jwt = require('jsonwebtoken');
// // // const User = require('../models/User'); // Your User model

// // // // Middleware to verify JWT token
// // // const authMiddleware = (req, res, next) => {
// // //   const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from headers
// // //   if (!token) {
// // //     return res.status(401).json({ message: 'Access denied. No token provided.' });
// // //   }

// // //   try {
// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
// // //     req.user = decoded; // Attach user info to request object
// // //     next(); // Pass control to the next middleware/route handler
// // //   } catch (error) {
// // //     res.status(400).json({ message: 'Invalid or expired token.' });
// // //   }
// // // };

// // // // Route to get user profile
// // // router.get('/profile', authMiddleware, async (req, res) => {
// // //   try {
// // //     const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
// // //     if (!user) {
// // //       return res.status(404).json({ message: 'User not found.' });
// // //     }
// // //     res.json(user); // Return user profile
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error fetching profile.', error: error.message });
// // //   }
// // // });

// // // module.exports = router;
// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User'); // Adjust the path to your User model
// // const jwt = require('jsonwebtoken');
// // require('dotenv').config();

// // // Middleware to verify JWT
// // const verifyToken = (req, res, next) => {
// //   const token = req.header('Authorization')?.replace('Bearer ', '');

// //   if (!token) {
// //     return res.status(401).json({ message: 'Access denied. No token provided.' });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded; // Attach user info to the request
// //     next();
// //   } catch (error) {
// //     return res.status(400).json({ message: 'Invalid token.' });
// //   }
// // };

// // // GET /api/profile - Fetch user profile
// // router.get('/', verifyToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id).select('-password');
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     return res.status(200).json({ message: 'Profile fetched successfully.', user });
// //   } catch (error) {
// //     console.error('Error fetching profile:', error);
// //     return res.status(500).json({ message: 'Internal server error.', error: error.message });
// //   }
// // });

// // module.exports = router;






// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User'); // Adjust the path to your User model
// // const jwt = require('jsonwebtoken');
// // require('dotenv').config();

// // // Middleware to verify JWT
// // const verifyToken = (req, res, next) => {
// //   const token = req.header('Authorization')?.replace('Bearer ', '');

// //   if (!token) {
// //     return res.status(401).json({ message: 'Access denied. No token provided.' });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded; // Attach user info (decoded payload) to the request
// //     next();
// //   } catch (error) {
// //     return res.status(400).json({ message: 'Invalid token.' });
// //   }
// // };

// // // GET /api/profile - Fetch user profile
// // router.get('/', verifyToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id).select('-password');
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     return res.status(200).json({ user });
// //   } catch (error) {
// //     console.error('Error fetching profile:', error);
// //     return res.status(500).json({ message: 'Internal server error.', error: error.message });
// //   }
// // });

// // module.exports = router;


// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Navbar from './Navbar'; // Import Navbar component
// // import './Profile.css'; // Add styling for profile page

// // const Profile = () => {
// //   const [profile, setProfile] = useState(null);
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         navigate('/login'); // Redirect to login if no token is found
// //         return;
// //       }

// //       try {
// //         const response = await fetch('http://localhost:5000/api/profile', {
// //           method: 'GET',
// //           headers: {
// //             'Authorization': `Bearer ${token}`, // Attach JWT token
// //             'Content-Type': 'application/json',
// //           },
// //         });

// //         const data = await response.json();

// //         if (response.ok) {
// //           setProfile(data.user); // Set user details to state
// //         } else {
// //           setErrorMessage(data.message || 'Failed to load profile.');
// //         }
// //       } catch (error) {
// //         setErrorMessage('An error occurred while fetching profile.');
// //         console.error('Profile fetch error:', error);
// //       }
// //     };

// //     fetchProfile();
// //   }, [navigate]);

// //   if (errorMessage) {
// //     return <div>{errorMessage}</div>;
// //   }

// //   if (!profile) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div>
// //       <Navbar /> {/* Include the Navbar */}
// //       <div className="profile-container">
// //         <h2>Welcome to GCC Hiring Platform, {profile.name}!</h2>
// //         <p>Email: {profile.email}</p>
// //         <p>Phone: {profile.phone}</p>
// //         <p>Date of Birth: {profile.dob}</p>
// //         <p>Gender: {profile.gender}</p>
// //         <p>Roll Number: {profile.rollno}</p>
// //         <p>College: {profile.college}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;



// // const express = require('express');
// // const router = express.Router();
// // const { verifyToken } = require('../middleware/auth');
// // const User = require('../models/User');

// // // Get user profile
// // router.get('/profile', verifyToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id).select('-password'); // Exclude password
// //     if (!user) return res.status(404).json({ message: 'User not found.' });

// //     res.json({ user });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error.' });
// //   }
// // });

// // // Update user profile
// // router.put('/profile', verifyToken, async (req, res) => {
// //   const { name, email, phone, rollno, dob, gender, college } = req.body;

// //   try {
// //     if (!name || !email || !phone || !rollno || !dob || !gender || !college) {
// //       return res.status(400).json({ message: 'All fields are required.' });
// //     }

// //     const updatedUser = await User.findByIdAndUpdate(
// //       req.user.id,
// //       { name, email, phone, rollno, dob, gender, college },
// //       { new: true }
// //     ).select('-password'); // Exclude password

// //     if (!updatedUser)
// //       return res.status(404).json({ message: 'User not found.' });

// //     res.json({ message: 'Profile updated successfully.', user: updatedUser });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error.' });
// //   }
// // });

// // module.exports = router;











// // const express = require('express');
// // const router = express.Router();
// // const { verifyToken } = require('../middleware/auth');
// // const User = require('../models/User');

// // router.get('/profile', verifyToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id).select('-password'); 
// //     if (!user) return res.status(404).json({ message: 'User not found.' });

// //     res.json({ user });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error.' });
// //   }
// // });

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/auth');
// const User = require('../models/User');

// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password'); // Exclude password
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     res.json({ user });
//   } catch (error) {
//     console.error('Error in /profile:', error.message);
//     res.status(500).json({ message: 'Server error.' });
//   }
// });

// module.exports = router;
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.userId = decoded.id;
    next();
  });
};

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;