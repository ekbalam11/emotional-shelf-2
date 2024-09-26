const Book = require('../models/book.model');

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

    //Cuando esto funcione, implementar las validaciones que pide el ejercicio (que ":emotion" sea una emoción válida en la REST API)
    const allowedEmotions = ['Inspiration', 'Curiostity', 'Espacism', 'Nostalgia', 'Happiness', 'Sadness'];

    //Si esta emoción NO está en el array de emociones tiene que dar error
    if(!allowedEmotions.includes(emotion)) {
        return res.status(400).json({
            message: `The emotion ${emotion} is not a valid value`
        })
    }
    //Incluir expresión regular para que no distinga entre mayus y minus

    //2. Usar el ":emotion" para hacer una búsqueda en el modelo de los 20 primeros libros que incluyen la emoción ":emotion"
    const books = await Book.find({
        emotions: { $in: [emotion] }
    });

    console.log('books: ', books);
    

    //3. Responder al cliente con un JSON con una respuesta similar a la del controlador getBooks en cuanto a su estructura de respuesta
    res.status(200).json({
        message: "Query executed successfully for emotion "+ emotion,
        results: books
    })

}