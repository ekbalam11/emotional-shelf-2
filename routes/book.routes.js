const express = require('express');
const { getBooks, getRecommendactionsByEmotion } = require('../controllers/book.controllers');
const router = express.Router();

router.get('/books', getBooks);
router.get('/books/recommendations/:emotion', getRecommendactionsByEmotion)

module.exports = router;