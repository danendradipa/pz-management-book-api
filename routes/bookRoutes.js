const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', authMiddleware, bookController.addBook);
router.put('/:id', authMiddleware, bookController.updateBookById);
router.delete('/:id', authMiddleware, bookController.deleteBookById);

module.exports = router;
