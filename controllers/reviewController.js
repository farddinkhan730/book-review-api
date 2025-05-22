const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const existingReview = await Review.findOne({ book: req.params.id, user: req.user._id });
    if (existingReview) return res.status(400).json({ message: 'You already reviewed this book' });

    const review = new Review({ book: req.params.id, user: req.user._id, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!review) return res.status(404).json({ message: 'Review not found or not authorized' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
