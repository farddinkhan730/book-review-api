const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, createdBy: req.user._id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (genre) filter.genre = { $regex: genre, $options: 'i' };

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: book._id })
      .populate('user', 'username')
      .limit(10);

    const avgRating = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    res.json({
      book,
      averageRating: avgRating[0]?.avgRating || 0,
      reviews
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};