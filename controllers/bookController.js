const Book = require('../models/book');

exports.addBook = async (req, res) => {
    const { title, author, year, bookCode } = req.body;

    try {
        const existingBook = await Book.findOne({ bookCode });
        if (existingBook) {
            return res.status(409).json({ message: 'Book code already exists' });
        }
        const newBook = new Book({ title, author, year, bookCode });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add book', error: error.message });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ message: 'Books retrieved successfully', data: books });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve books', error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book retrieved successfully', data: book });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve book', error: error.message });
    }
};

exports.updateBookById = async (req, res) => {
    const { bookCode } = req.body;

    try {
        if (bookCode) {
            const duplicateBook = await Book.findOne({ bookCode, _id: { $ne: req.params.id } });
            if (duplicateBook) return res.status(409).json({ message: 'Book code already exists' });
        }

        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book updated successfully', data: book });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update book', error: error.message });
    }
};

exports.deleteBookById = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
};
