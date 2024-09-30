const express = require('express');
const { getBooks, getRecommendactionsByEmotion, getRandomRecommendationByEmotion, postBook } = require('../controllers/book.controllers');
const { validateEmotion, validateNewBook } = require('./book.validations');
const router = express.Router();


router.get('/books', getBooks);
router.get('/books/recommendations/:emotion', validateEmotion, getRecommendactionsByEmotion);
router.get('/books/recommendations/:emotion/random', validateEmotion, getRandomRecommendationByEmotion),
router.post('/books', validateNewBook, postBook)

module.exports = router;