const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  options: { type: [String], required: false },
  correctAnswer: { type: String, required: false },
  codeSnippet: { type: String, required: false },
  type: { type: String, required: true, enum: ['mcq', 'coding'] },
});

module.exports = mongoose.model('Question', questionSchema);
