const express = require('express');
const router = express.Router();
const data = require('../data');
const { route } = require('./reviews');
const bookData = data.books;

router.get('/', async (req, res) => {
    try {
        const bookList = await bookData.getAllBooks()
        res.json(bookList)
    } catch(e) {
        res.status(500).json({error: e})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await bookData.getBookById(req.params.id)
        res.json(book)
    } catch(e) {
        res.status(404).json({message: 'Book not found'})
    }
})


router.post('/', async (req, res) => {
    const bookBodyData = req.body
    try {
        const {title, author, genre, datePublished, summary} = bookBodyData
        const newBook = await bookData.createBook(title, author, genre, datePublished, summary)
        res.json(newBook)
    } catch(e) {
        res.status(500).json({error: "you're terrible"})
    }
})

router.put('/:id', async (req, res) => {
    const bookBodyData = req.body
    try {
        const updatedBook = await bookData.updateBook(req.params.id, bookBodyData)
    } catch (e) {
        res.status(500).json({error: e})
    }
})

router.patch('/:id', async (req, res) => {
    const bookBodyData = req.body
})

router.delete('/:id', async(req, res) => {
    const bookBodyData = req.body
    try {
        const deleteBook = await bookData.deleteBook(req.params.id)
        res.sendStatus(200);
    } catch (e) {
        res.status(500).json({error:e})
    }
})

module.exports = router;