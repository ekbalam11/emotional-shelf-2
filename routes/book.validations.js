const { param } = require('express-validator');

const allowedEmotions = ['Inspiration', 'Curiosity', 'Escapism', 'Nostalgia', 'Happiness', 'Sadness'];

exports.validateEmotion = [
    param('emotion')
    .customSanitizer((value) => {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    })
    .isIn(allowedEmotions)
    .withMessage('Invalid emotion')
];