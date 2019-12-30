const express = require('express');
const router = express.Router();

const Question = require('../../models/Question');

// @route   GET api/questions
// @desc    Get All Questions
// @access  Public
router.get('/', (req, res) => {
  Question.find()
    .then(questions => res.json(questions));
});

// @route   POST api/questions
// @desc    Create A Question
// @access  Public
router.post('/', (req, res) => {
  const { 
    questionText, 
    correctAnswer, 
    incorrectAnswer1, 
    incorrectAnswer2, 
    incorrectAnswer3 
  } = req.body;

  const newQuestion = new Question({
    questionText, 
    correctAnswer, 
    incorrectAnswer1, 
    incorrectAnswer2, 
    incorrectAnswer3 
  });

  newQuestion.save().then(question => res.json(question));
});

// @route   DELETE api/questions/:id
// @desc    Delete A Question
// @access  Public
router.delete('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => question.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;