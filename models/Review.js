const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
