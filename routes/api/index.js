const express = require('express');
const router = express.Router();
const quizData = require('../../utils/quiz.json');


router.get('/quiz', (req, res, next) => {
  return res.send({quiz: JSON.stringify(quizData)});
});

module.exports = router;
