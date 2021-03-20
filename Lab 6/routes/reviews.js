const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews

router.get('/:id', async (req, res) => {
    try {
        const review = await reviewData.getReviewsByBookId(req.params.id)
        res.status(200).json(review)
    } catch(e) {
        res.status(404).json({message: 'Review not found'})
    }
})

router.get('/review/:id', async (req, res) => {
    try {
        const review = await reviewData.getReviewsById(req.params.id)
        res.status(200).json(review)
    } catch(e) {
        res.status(404).json({message: 'Review not found'})
    }
})

router.post('/:id', async (req, res) => {
    const reviewBodyData = req.body
    if (!reviewBodyData.title) {
        res.status(400).json({ error: 'You must have book title' });
        return;
      }
      if (!reviewBodyData.reviewer) {
        res.status(400).json({ error: 'You must provide reviewer' });
        return;
      }
      if (!reviewBodyData.rating) {
        res.status(400).json({ error: 'You must provide rating' });
        return;
      }
      
      if (!reviewBodyData.dateOfReview) {
        res.status(400).json({ error: 'You must provide date of review of book' });
        return;
      }
      
      if (!reviewBodyData.review) {
        res.status(400).json({ error: 'You must provide review' });
        return;
      }
    try {
        const {title, reviewer, rating, dateOfReview, review} = reviewBodyData
        const newReview = await reviewData.createReview(req.params.id, title, reviewer, rating, dateOfReview, review)
        res.status(200).json(newReview)
    } catch(e) {
        res.status(500).json({error: "you're terrible"})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const review = await reviewData.deleteReview(req.params.id)
        res.status(200).json({"bookId": req.params.id, "deleted": true});
    } catch(e) {
        res.status(500).json({error: e})
    }
})


module.exports = router

