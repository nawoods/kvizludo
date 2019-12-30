const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  questionText: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  incorrectAnswer1: {
    type: String,
    required: true
  },
  incorrectAnswer2: {
    type: String,
    required: true
  },
  incorrectAnswer3: {
    type: String,
    required: true
  },
})

module.exports = Question = mongoose.model('question', QuestionSchema);