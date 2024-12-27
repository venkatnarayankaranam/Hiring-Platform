const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User'); // Update the path to your User model

dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const registerAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'Gcc2026' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('Gcc@2026', 10); // Securely hash the password
    const admin = new User({
      name: 'Global Coding Club Admin',
      email: 'Gcc2026',
      password: hashedPassword,
      role: 'admin',
      rollno: 'N/A',
      fatherName: 'N/A',
      college: 'N/A',
      branch: 'N/A',
      gender: 'N/A',
      dob: 'N/A',
    });

    await admin.save();
    console.log('Admin registered successfully');
  } catch (error) {
    console.error('Error registering admin:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

registerAdmin();
