// const Question = require('../models/Question');
// const User = require('../models/User');
// const compileCode = require('../compiler');

// const submitExam = async (req, res) => {
//   const { userId, answers } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const questions = await Question.find();
//     let totalMarks = 0;

//     for (const question of questions) {
//       const userAnswer = answers[question._id];
//       if (question.type === 'mcq') {
//         if (userAnswer === question.correctAnswer) {
//           totalMarks += 1;
//         }
//       } else if (question.type === 'coding') {
//         const result = await new Promise((resolve) => {
//           compileCode(userAnswer, (error, output) => {
//             if (error) {
//               resolve(0);
//             } else {
//               // Assuming the correct output is stored in question.correctAnswer
//               resolve(output.trim() === question.correctAnswer.trim() ? 10 : 0);
//             }
//           });
//         });
//         totalMarks += result;
//       }
//     }

//     user.marks = totalMarks;
//     await user.save();

//     res.json({ message: 'Exam submitted successfully', totalMarks });
//   } catch (error) {
//     res.status(500).json({ message: 'Error submitting exam', error: error.message });
//   }
// };

// module.exports = { submitExam };






const User = require('../models/User');
const Question = require('../models/Question'); // Assuming you have a Question model

const submitExam = async (req, res) => {
  const { answers } = req.body;
  const userId = req.user.id;

  try {
    let totalMarks = 0;

    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question.correctAnswer === answer.answer) {
        totalMarks += question.marks;
      }
    }

    await User.findByIdAndUpdate(userId, { marks: totalMarks });

    res.json({ message: 'Exam submitted successfully', marks: totalMarks });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ message: 'Error submitting exam', error: error.message });
  }
};

module.exports = { submitExam };