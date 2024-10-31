const mongoose = require('mongoose');
const User = require('../models/user');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const users = [
    {
        username: 'danendra',
        password: 'hello12' 
    }
];

const seedUsers = async () => {
    try {
        await connectDB();
        await User.deleteMany({});
        const user = await User.create(users);
        console.log('User seeded:', user);
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
