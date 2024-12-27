// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   rollno: { type: String, required: true },
// //   fatherName: { type: String, required: true },
// //   college: { type: String, required: true },
// //   branch: { type: String, required: true },
// //   gender: { type: String, required: true },
// //   dob: { type: Date, required: true },
// //   role: { type: String, default: 'user', enum: ['user', 'admin', 'moderator'] },
// //   allocatedSlot: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Slot',
// //     default: null,
// //   },
// // });

// // module.exports = mongoose.model('User', userSchema);
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     rollno: { type: String },
//     fatherName: { type: String },
//     college: { type: String },
//     branch: { type: String },
//     gender: { type: String },
//     dob: { type: Date },
//     role: { type: String, default: 'user', enum: ['user', 'admin'] },
//     allocatedSlot: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Slot',
//         default: null,
//     },
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rollno: { type: String },
    fatherName: { type: String },
    college: { type: String },
    branch: { type: String },
    gender: { type: String },
    dob: { type: Date },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    allocatedSlot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        default: null,
    },
    marks: { type: Number, default: 0 }, // Add marks field
});

module.exports = mongoose.model('User', userSchema);