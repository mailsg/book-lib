const Book = require("../models/book");
const validator = require("validator");

module.exports.getBooks = async (req, res) => {

    const books = await Book.find();
    const bookData = books.map((book) => {
        return {
            id: book._id.toString(),
            title: book.title,
            author: book.author,
            publication_year: book.publication_year,
        };
    });
  
    return res.json(bookData);

};

module.exports.postBook = async (req, res) => {
    
    try {
        const { title, author, publication_year } = req.body;

        // Validate input
        if (!validator.isLength(title, { min: 1, max: 255 }) || !validator.isLength(author, { min: 1, max: 255 })) {
            return res.status(400).json({ error: 'Title and author must be between 1 and 255 characters.' });
        }

        if (!validator.isInt(publication_year) || parseInt(publication_year) < 0) {
            return res.status(400).json({ error: 'Invalid publication year.' });
        }

        const newBook = new Book({
            title,
            author,
            publication_year,
        });

        const savedBook = await newBook.save();
    
        return res.status(201).json(savedBook);

    } catch (error) {
        return res.status(500).json({ error: 'Invalid data' });
    }
};

module.exports.getBookById = async (req, res) => {
    
    const book = await Book.findById(req.params.id);
    bookData = {
        title: book.title,
        author: book.author,
        publication_year: book.publication_year,
    };
    
    return res.json(bookData);

};

module.exports.putBookById = async (req, res) => {

    const { title, author, publication_year } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, publication_year },
            { new: true}
        );

        if(!updatedBook){
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated successfully" });

    } catch (error){
        return res.status(500).json({ error: "Invalid data" });       
    }

};

module.exports.deleteBookById = async (req, res) => {
    
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook){
            return res.status(404).json({ error: "Book not found" })
        }
        return res.status(200).json({ message: "Book deleted successfully" });

    } catch (error) {
        return res.status(500).json({ error: "Invalid data" });
    }

};
