// // const express = require('express');
// // const mongoose = require('mongoose');
// // const Slot = require('../models/Slot');
// // const User = require('../models/User');
// // const authenticate = require('../middleware/auth');
// // const router = express.Router();
  
// //   // Fetch all slots
// //   router.get('/', async (req, res) => {
// //     try {
// //       const slots = await Slot.find();
// //       if (!slots || slots.length === 0) {
// //         return res.status(404).json({ message: 'No slots available.' });
// //       }
// //       res.status(200).json({
// //         slots: slots.map((slot) => ({
// //           id: slot._id,
// //           name: slot.name,
// //           date: slot.date,
// //           time: slot.time,
// //           capacity: slot.capacity,
// //           available: slot.capacity - slot.users.length,
// //         })),
// //       });
// //     } catch (err) {
// //       console.error('Error fetching slots:', err.message);
// //       res.status(500).json({ message: 'Server error.' });
// //     }
// //   });
  
// //   // Book a slot
// //   router.post('/select', authenticate, async (req, res) => {
// //     const { slotId } = req.body;
// //     if (!slotId) return res.status(400).json({ message: 'Slot ID is required.' });
  
// //     try {
// //       if (!mongoose.Types.ObjectId.isValid(slotId)) {
// //         return res.status(400).json({ message: 'Invalid slot ID.' });
// //       }
  
// //       const slot = await Slot.findById(slotId);
// //       if (!slot) return res.status(404).json({ message: 'Slot not found.' });
// //       if (slot.users.includes(req.user._id)) {
// //         return res.status(400).json({ message: 'You already booked this slot.' });
// //       }
// //       if (slot.users.length >= slot.capacity) {
// //         return res.status(400).json({ message: 'Slot is full.' });
// //       }
  
// //       slot.users.push(req.user._id);
// //       await slot.save();
  
// //       req.user.examSlot = slot._id;
// //       await req.user.save();
  
// //       res.status(200).json({ message: 'Slot booked successfully.' });
// //     } catch (err) {
// //       console.error('Error booking slot:', err.message);
// //       res.status(500).json({ message: 'Server error.' });
// //     }
// //   });
  
// //   module.exports = router;
// const express = require('express');
// const mongoose = require('mongoose');
// const Slot = require('../models/Slot');
// const authenticate = require('../middleware/auth');
// const router = express.Router();

// // Fetch all slots
// router.get('/', async (req, res) => {
//   try {
//     const slots = await Slot.find();
//     if (!slots || slots.length === 0) {
//       return res.status(404).json({ message: 'No slots available.' });
//     }
//     res.status(200).json({
//       slots: slots.map((slot) => ({
//         id: slot._id,
//         name: slot.examName,
//         date: slot.date,
//         time: `${slot.startTime} - ${slot.endTime}`,
//         capacity: slot.capacity,
//         available: slot.capacity - slot.allocatedUsers.length,
//       })),
//     });
//   } catch (err) {
//     console.error('Error fetching slots:', err.message);
//     res.status(500).json({ message: 'Server error.' });
//   }
// });

// // Book a slot
// router.post('/select', authenticate, async (req, res) => {
//   const { slotId } = req.body;
//   if (!slotId) return res.status(400).json({ message: 'Slot ID is required.' });

//   try {
//     if (!mongoose.Types.ObjectId.isValid(slotId)) {
//       return res.status(400).json({ message: 'Invalid slot ID.' });
//     }

//     const slot = await Slot.findById(slotId);
//     if (!slot) return res.status(404).json({ message: 'Slot not found.' });
//     if (slot.allocatedUsers.includes(req.user.id)) {
//       return res.status(400).json({ message: 'You already booked this slot.' });
//     }
//     if (slot.allocatedUsers.length >= slot.capacity) {
//       return res.status(400).json({ message: 'Slot is full.' });
//     }

//     slot.allocatedUsers.push(req.user.id);
//     await slot.save();

//     res.status(200).json({ message: 'Slot booked successfully.', slot });
//   } catch (err) {
//     console.error('Error booking slot:', err.message);
//     res.status(500).json({ message: 'Server error.' });
//   }
// });

// module.exports = router;


const express = require('express');
const Slot = require('../models/Slot');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find();
    if (!slots || slots.length === 0) {
      return res.status(404).json({ message: 'No slots available.' });
    }
    res.status(200).json({
      slots: slots.map((slot) => ({
        id: slot._id,
        examName: slot.examName,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        capacity: slot.capacity,
        available: slot.capacity - slot.allocatedUsers.length,
      })),
    });
  } catch (err) {
    console.error('Error fetching slots:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;