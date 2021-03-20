const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
let { ObjectId } = require('mongodb');



let exportedMethods = {
    validateDate(dateString) {
        if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
            return false
        }
        return true
    },
    async getAllBooks() {
        const bookCollection = await books()
        return await bookCollection.find({}).toArray()
    },
    async getBookById(id) {
        const bookCollection = await books()
        return await bookCollection.findOne({_id: ObjectId(id)})
    },
    async createBook(title, author, genre, datePublished, summary) {
        if (typeof title !== 'string') throw 'No title provided'
        if (typeof author.authorFirstName !== 'string') throw 'No author first name provided'
        if (typeof author.authorLastName !== 'string') throw 'No author last name provided'
        if (!(genre instanceof Array) || genre.length <= 0) throw 'No genre provided'
        if (typeof datePublished !== 'string' || !(this.validateDate(datePublished))) throw 'No date published provided'
        if (typeof summary !== 'string') throw 'No summary provided'
        const bookCollection = await books()
        let book = {
            title: title,
            author: author,
            genre: genre,
            datePublished: datePublished,
            summary: summary,
            reviews: []
        }
        const newBook = await bookCollection.insertOne(book)
        const newId = newBook.insertedId
        return await this.getBookById(newId)

    },
    async updateBook(id, updatedBook) {
        const bookCollection = await books()
        const updatedBookData = {}
        if (updatedBook.title) updatedBookData.title = updatedBook.title
        if (updatedBook.author) updatedBookData.author = updatedBook.author
        if (updatedBook.genre) updatedBookData.genre= updatedBook.genre
        if (updatedBook.datePublished && this.validateDate(updatedBook.datePublished)) updatedBookData.datePublished = updatedBook.datePublished
        if (updatedBook.summary) updatedBookData.summary = updatedBook.summary
        await bookCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedBookData });
        return await this.getBookById(id)
    },

    async deleteBook(id) {
        const bookCollection = await books()
        await bookCollection.findOneAndDelete({ _id: ObjectId(id) });
        return await this.getBookById(id)
    },

    async getReviewsById(id) {
        
        const bookCollection = await books()
        
        const reviewList =  await bookCollection
        .find({_id: ObjectId(id)}, { projection: {
            _id: 0,
            reviews: 1
            }
        }).toArray()

        return reviewList[0].reviews
    },

    async addReviewToBook(bookId, reviewId, title, reviewer, rating, dateOfReview, review) {
        const bookCollection = await books()

        const updateBook = await bookCollection.updateOne(
            {_id: ObjectId(bookId)},
            {$addToSet: { reviews: {id: reviewId, title, reviewer, rating, dateOfReview, review}}}
        )

        return await this.getBookById(bookId)
    },

    async deleteReviewFromBook(reviewId) {
        const bookCollection = await books()
        const book = await bookCollection.findOne({
            reviews: { $elemMatch: { id: { $eq: ObjectId(reviewId)}}}
        })
        await bookCollection.updateOne(
            {_id: ObjectId(book._id)},
            {$pull: { reviews: { id: ObjectId(reviewId)}}}
        )

        return await this.getBookById(book._id)
    }
};

module.exports = exportedMethods;