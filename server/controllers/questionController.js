const Question = require('../models/Question');

const addQuestion = async (req, res) => {
  const { title, description, options, correctAnswer, codeSnippet, type } = req.body;

  try {
    const question = new Question({
      title,
      description,
      options,
      correctAnswer,
      codeSnippet,
      type,
    });

    await question.save();
    res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding question', error: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

module.exports = { addQuestion, getQuestions };
