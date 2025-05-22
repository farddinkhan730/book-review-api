const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const bookController = require('../controllers/bookController');

router.post('/books', auth, bookController.addBook);
router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);

module.exports = router;
