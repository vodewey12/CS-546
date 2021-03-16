const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews

router.get('/:id', async (req, res) => {
    try {
        const review = await reviewData.getReviewsByBookId(req.params.id)
        res.json(review)
    } catch(e) {
        res.status(404).json({message: 'Review not found'})
    }
})

router.get('/review/:id', async (req, res) => {
    try {
        const review = await reviewData.getReviewsById(req.params.id)
        res.json(review)
    } catch(e) {
        res.status(404).json({message: 'Review not found'})
    }
})

router.post('/:id', async (req, res) => {
    const reviewBodyData = req.body
    try {
        const {title, reviewer, rating, dateOfReview, review} = reviewBodyData
        const newReview = await reviewData.createReview(req.params.id, title, reviewer, rating, dateOfReview, review)
        res.json(newReview)
    } catch(e) {
        res.status(500).json({error: "you're terrible"})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const review = await reviewData.deleteReview(req.params.id)
        res.sendStatus(200)
    } catch(e) {
        res.status(500).json({error: e})
    }
})


module.exports = router

