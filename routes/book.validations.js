const { param, body } = require('express-validator');

const allowedEmotions = ['Inspiration', 'Curiosity', 'Escapism', 'Nostalgia', 'Happiness', 'Sadness'];

exports.validateEmotion = [
    param('emotion')
    .customSanitizer((value) => {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    })
    .isIn(allowedEmotions)
    .withMessage('Invalid emotion')
];

// Validation middleware using express-validator
exports.validateNewBook = [
    body('title').not().isEmpty().isLength({ max: 50 }).withMessage('Title is required'),
    body('isbn').isLength({ min: 13, max: 13 }).withMessage('ISBN should be between 13 characters'),
    body('price').isFloat({ gt: 0 }).withMessage('Price should be a positive number'),
    body('description').not().isEmpty().withMessage('Description is required').isLength({ max: 4000 }).withMessage('Description can be up to 4000 characters'),
    body('emotions').isArray().withMessage('Emotions should be an array').custom(emotionsArray => {
        const isValid = emotionsArray.every(emotion => validEmotions.includes(emotion));
        if (!isValid) {
            throw new Error('Emotions must be one of the following: ' + validEmotions.join(', '));
        }
        return true;
    }),
]