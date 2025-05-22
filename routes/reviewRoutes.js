const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const reviewController = require('../controllers/reviewController');

router.post('/books/:id/reviews', auth, reviewController.addReview);
router.put('/reviews/:id', auth, reviewController.updateReview);
router.delete('/reviews/:id', auth, reviewController.deleteReview);

module.exports = router;
