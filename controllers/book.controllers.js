const Book = require('../models/book.model');
const { validationResult } = require('express-validator')

exports.getBooks = async (req, res) => {
    const books = await Book.find().limit(20);

    return res.status(200).json({
        message: "Query executed successfully",
        results: books
    })
}

exports.getRecommendactionsByEmotion = async(req, res) => {
    //1. Recuperar el valor de la ruta dinámica
    // ¿Cómo obtener el valor dinámico ":emotion" de /api/books/recommendations/:emotion
    const { emotion } = req.params;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: `error when trying to find books with emotion ${emotion}`,
            errors: errors.array()
        })
    }
 
    //Incluir expresión regular para que no distinga entre mayus y minus

    //2. Usar el ":emotion" para hacer una búsqueda en el modelo de los 20 primeros libros que incluyen la emoción ":emotion"
    const books = await Book.find({
        emotions: { $in: [emotion] }
    });

    console.log('books 1-3:', books.slice(0, 3));
    

    //3. Responder al cliente con un JSON con una respuesta similar a la del controlador getBooks en cuanto a su estructura de respuesta
    res.status(200).json({
        message: "Query executed successfully for emotion "+ emotion,
        results: books
    })

}

    exports.getRandomRecommendationByEmotion = async (req, res) => {
        const { emotion } = req.params;

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                message: `error when trying to find random books with emotion ${emotion}`,
                errors: errors.array()
            })
        }
     
        //Incluir expresión regular para que no distinga entre mayus y minus
    
        //2. Usar el ":emotion" para hacer una búsqueda en el modelo de los 20 primeros libros que incluyen la emoción ":emotion"
        const randomBook = await Book.aggregate([
            { $match: { emotions: { $in: [emotion] } } }, 
            { $sample: { size: 1 } }// Randomly select one book from the matched books
        ]);
    
        console.log('randomBook:', randomBook);
        
    
        //3. Responder al cliente con un JSON con una respuesta similar a la del controlador getBooks en cuanto a su estructura de respuesta
        res.status(200).json({
            message: "Query executed successfully for emotion "+ emotion,
            results: randomBook
        })
}