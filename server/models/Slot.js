// const mongoose = require('mongoose');

// const slotSchema = new mongoose.Schema({
//     examName: { type: String, required: true },
//     date: { type: Date, required: true },
//     startTime: { type: String, required: true },
//     endTime: { type: String, required: true },
//     allocatedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// });

// module.exports = mongoose.model('Slot', slotSchema);











const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  capacity: { type: Number, default: 100 }, 
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
});

module.exports = mongoose.model('Slot', slotSchema);
