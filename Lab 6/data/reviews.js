const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const books = require('./books')
let { ObjectId } = require('mongodb');

let exportedMethods = {
    validateDate(dateString) {
        if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
            return false
        }
        return true
    },
    async getReviewsByBookId(id) {
        const reviewCollection = await reviews()
        return await books.getReviewsById(id)
    },
    async getReviewsById(id) {
        const reviewCollection = await reviews()
        return await reviewCollection.findOne({_id: ObjectId(id)})
    },
    async createReview(bookId, title, reviewer, rating, dateOfReview, review) {
        if (typeof title !== 'string') throw 'Now title provided'
        if (typeof reviewer !== 'string') throw 'Now reviewer provided'
        if (typeof rating !== 'number'  || rating < 0 || rating > 5) throw 'Now rating provided'
        if (typeof dateOfReview !== 'string' || !this.validateDate(dateOfReview)) throw 'Now date of review provided'
        if (typeof review !== 'string') throw 'Now review provided'
        const reviewCollection = await reviews()
        let reviewobj = {
            title: title,
            reviewer: reviewer,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review
        }
        const newReview = await reviewCollection.insertOne(reviewobj)
        const newId = newReview.insertedId
        return await books.addReviewToBook(bookId, newId, reviewobj.title, reviewobj.reviewer, reviewobj.rating, reviewobj.dateOfReview, reviewobj.review)
        
    },

    async deleteReview(id) {
        const reviewCollection = await reviews()
        const review = await reviewCollection.removeOne({_id: ObjectId(id)})
        await books.deleteReviewFromBook(id)
    }

};

module.exports = exportedMethods;