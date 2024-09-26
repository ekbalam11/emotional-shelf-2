const express = require('express');
const { getBooks, getRecommendactionsByEmotion, getRandomRecommendationByEmotion } = require('../controllers/book.controllers');
const { validateEmotion } = require('./book.validations');

const router = express.Router();


router.get('/books', getBooks);
router.get('/books/recommendations/:emotion', validateEmotion, getRecommendactionsByEmotion);
router.get('/books/recommendations/:emotion/random', validateEmotion, getRandomRecommendationByEmotion)
module.exports = router;