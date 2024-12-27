// // // // // // const express = require('express');
// // // // // // const mongoose = require('mongoose');
// // // // // // const dotenv = require('dotenv');
// // // // // // const cors = require('cors');
// // // // // // const authRoutes = require('./routes/auth');
// // // // // // const User = require('./models/User');
// // // // // // const jwt = require('jsonwebtoken');

// // // // // // dotenv.config();

// // // // // // const app = express();

// // // // // // app.use(cors());
// // // // // // app.use(express.json());

// // // // // // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // // // // //   .then(() => console.log('Database connected successfully'))
// // // // // //   .catch((err) => console.error('Database connection error:', err));

// // // // // // const verifyToken = (req, res, next) => {
// // // // // //   const token = req.header('Authorization')?.split(' ')[1];
// // // // // //   if (!token) {
// // // // // //     return res.status(401).json({ message: 'Access denied. No token provided.' });
// // // // // //   }

// // // // // //   try {
// // // // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // // // // //     req.user = decoded;
// // // // // //     next();
// // // // // //   } catch (err) {
// // // // // //     res.status(400).json({ message: 'Invalid token.' });
// // // // // //   }
// // // // // // };

// // // // // // app.get('/api/admin/users', verifyToken, async (req, res) => {
// // // // // //   if (req.user.role !== 'admin') {
// // // // // //     return res.status(403).json({ message: 'Access denied. Admins only.' });
// // // // // //   }

// // // // // //   try {
// // // // // //     const users = await User.find().select('-password');
// // // // // //     res.json({ users });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ message: 'Error fetching users', error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // app.use('/api/auth', authRoutes);

// // // // // // const PORT = process.env.PORT || 5000;
// // // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // // // // const express = require('express');
// // // // // const mongoose = require('mongoose');
// // // // // const dotenv = require('dotenv');
// // // // // const cors = require('cors');
// // // // // const jwt = require('jsonwebtoken');
// // // // // const User = require('./models/User');

// // // // // dotenv.config();

// // // // // const app = express();
// // // // // app.use(cors());
// // // // // app.use(express.json());

// // // // // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // // // //   .then(() => console.log('Database connected successfully'))
// // // // //   .catch((err) => console.error('Database connection error:', err));

// // // // // const verifyToken = (req, res, next) => {
// // // // //   const token = req.header('Authorization')?.split(' ')[1];
// // // // //   if (!token) {
// // // // //     return res.status(401).json({ message: 'Access denied. No token provided.' });
// // // // //   }

// // // // //   try {
// // // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // // // //     req.user = decoded;
// // // // //     next();
// // // // //   } catch (err) {
// // // // //     res.status(400).json({ message: 'Invalid token.' });
// // // // //   }
// // // // // };

// // // // // app.get('/api/admin/users', verifyToken, async (req, res) => {
// // // // //   if (req.user.role !== 'admin') {
// // // // //     return res.status(403).json({ message: 'Access denied. Admins only.' });
// // // // //   }

// // // // //   try {
// // // // //     const users = await User.find().select('-password');
// // // // //     res.json({ users });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: 'Error fetching users', error: err.message });
// // // // //   }
// // // // // });

// // // // // app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
// // // // const express = require('express');
// // // // const mongoose = require('mongoose');
// // // // const dotenv = require('dotenv');
// // // // const cors = require('cors');
// // // // const jwt = require('jsonwebtoken');
// // // // const User = require('./models/User');

// // // // dotenv.config();

// // // // const app = express();
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // // //   .then(() => console.log('Database connected successfully'))
// // // //   .catch((err) => console.error('Database connection error:', err));

// // // // const verifyToken = (req, res, next) => {
// // // //   const token = req.header('Authorization')?.split(' ')[1];
// // // //   if (!token) {
// // // //     return res.status(401).json({ message: 'Access denied. No token provided.' });
// // // //   }

// // // //   try {
// // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // // //     req.user = decoded;
// // // //     next();
// // // //   } catch (err) {
// // // //     return res.status(400).json({ message: 'Invalid token.' });
// // // //   }
// // // // };

// // // // app.get('/api/admin/users', verifyToken, async (req, res) => {
// // // //   if (req.user.role !== 'admin') {
// // // //     return res.status(403).json({ message: 'Access denied. Admins only.' });
// // // //   }

// // // //   try {
// // // //     const users = await User.find().select('-password');
// // // //     res.json({ users });
// // // //   } catch (err) {
// // // //     res.status(500).json({ message: 'Error fetching users', error: err.message });
// // // //   }
// // // // });

// // // // app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));















// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const dotenv = require('dotenv');
// // // const cors = require('cors');
// // // const authRoutes = require('./routes/auth'); 
// // // const adminRoutes = require('./routes/admin'); 
// // // const User = require('./models/User');
// // // const jwt = require('jsonwebtoken');

// // // dotenv.config();

// // // const app = express();


// // // app.use(cors());
// // // app.use(express.json());


// // // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // //   .then(() => console.log('Database connected successfully'))
// // //   .catch((err) => console.error('Database connection error:', err));


// // // const verifyToken = (req, res, next) => {
// // //   const token = req.header('Authorization')?.split(' ')[1]; 
// // //   if (!token) {
// // //     return res.status(401).json({ message: 'Access denied. No token provided.' });
// // //   }

// // //   try {
// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET); 
// // //     req.user = decoded; 
// // //     next(); 
// // //   } catch (err) {
// // //     res.status(400).json({ message: 'Invalid token.' });
// // //   }
// // // };

// // // app.get('/api/admin/users', verifyToken, async (req, res) => {
// // //   if (req.user.role !== 'admin') {
// // //     return res.status(403).json({ message: 'Access denied. Admins only.' });
// // //   }

// // //   try {
// // //     const users = await User.find().select('-password'); 
// // //     res.json({ users });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: 'Error fetching users', error: err.message });
// // //   }
// // // });


// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/admin', adminRoutes);
// // // app.use('api/profile', profileRoutes);
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));












// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const authRoutes = require('./routes/auth');
// const adminRoutes = require('./routes/admin');
// const profileRoutes = require('./routes/profile');
// const questionRoutes = require('./routes/questionRoutes');
// const User = require('./models/User'); // Import the User model

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Database connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Database connected successfully'))
//   .catch((err) => console.error('Database connection error:', err));

// // Middleware to verify token
// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     req.user = decoded; // Attach user info to the request
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// // Route for admin to fetch all user profiles
// app.get('/api/admin/users', verifyToken, async (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied. Admins only.' });
//   }

//   try {
//     const users = await User.find().select('-password'); // Fetch all users except their passwords
//     res.json({ users });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching users', error: err.message });
//   }
// });

// // Route for admin to view a specific user profile by ID
// app.get('/api/admin/users/:id', verifyToken, async (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied. Admins only.' });
//   }

//   try {
//     const user = await User.findById(req.params.id).select('-password'); // Fetch user by ID without password
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     res.json({ user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching user profile', error: err.message });
//   }
// });

// // Route setup
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/questions', questionRoutes);

// // Server initialization
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));















const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile');
const questionRoutes = require('./routes/questionRoutes');
const examRoutes = require('./routes/exam'); // Add exam routes
const User = require('./models/User'); // Import the User model

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Route for admin to fetch all user profiles
app.get('/api/admin/users', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const users = await User.find().select('-password'); // Fetch all users except their passwords
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Route for admin to view a specific user profile by ID
app.get('/api/admin/users/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const user = await User.findById(req.params.id).select('-password'); // Fetch user by ID without password
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
});

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/exam', examRoutes); // Use exam routes

// Server initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));