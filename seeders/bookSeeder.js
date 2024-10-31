const mongoose = require('mongoose');
const Book = require('../models/book');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const book = require('../models/book');
dotenv.config();

const books = [
    {
        title: 'Belajar Python untuk Pemula',
        author: 'John Doe',
        year: 2021,
        bookCode: 'BP001'
    },
    {
        title: 'Express.js Untuk Pemula',
        author: 'Calvin',
        year: 2020,
        bookCode: 'EJ001'
    },
];

const seedBooks = async () => {
    try {
        await connectDB();

        await Book.deleteMany({});

        const addedBooks = await Book.insertMany(books);
        console.log('Books seeded:', addedBooks);


        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding books:', error);
        process.exit(1);
    }
};

seedBooks();
