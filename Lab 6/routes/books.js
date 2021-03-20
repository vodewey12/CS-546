const express = require('express');
const router = express.Router();
const data = require('../data');
const { route } = require('./reviews');
const bookData = data.books;

router.get('/', async (req, res) => {
    try {
        const bookList = await bookData.getAllBooks()
        res.status(200).json(bookList)
    } catch(e) {
        res.status(500).json({error: e})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await bookData.getBookById(req.params.id)
        res.status(200).json(book)
    } catch(e) {
        res.status(404).json({message: 'Book not found'})
    }
})


router.post('/', async (req, res) => {
    const bookBodyData = req.body
    if (!bookBodyData.title) {
        res.status(400).json({ error: 'You must have book title' });
        return;
      }
      if (!bookBodyData.author) {
        res.status(400).json({ error: 'You must provide author' });
        return;
      }
      if (!bookBodyData.genre) {
        res.status(400).json({ error: 'You must provide genre' });
        return;
      }
      
      if (!bookBodyData.datePublished) {
        res.status(400).json({ error: 'You must provide date published of book' });
        return;
      }
      
      if (!bookBodyData.summary) {
        res.status(400).json({ error: 'You must provide summary' });
        return;
      }
    try {
        const {title, author, genre, datePublished, summary} = bookBodyData
        const newBook = await bookData.createBook(title, author, genre, datePublished, summary)
        res.status(200).json(newBook)
    } catch(e) {
        res.status(500).json({error: e})
    }
})

router.put('/:id', async (req, res) => {
    const bookBodyData = req.body
    if (!bookBodyData.title || !bookBodyData.author || !bookBodyData.genre 
        || !bookBodyData.datePublished || !bookBodyData.summary) {
        res.status(400).json({ error: 'You must Supply All fields' });
        return;
      }
    try {
        const updatedBook = await bookData.updateBook(req.params.id, bookBodyData)
        res.status(200).json(updatedBook)
    } catch (e) {
        res.status(500).json({error: e})
    }
})

router.patch('/:id', async (req, res) => {
    const bookBodyData = req.body
    try {
        const updatedBook = await bookData.updateBook(req.params.id, bookBodyData)
        res.status(200).json(updatedBook)
    } catch (e) {
        res.status(500).json({error: e})
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const deleteBook = await bookData.deleteBook(req.params.id)
        res.status(200).json({"bookId": req.params.id, "deleted": true});
    } catch (e) {
        res.status(500).json({error:e})
    }
})

module.exports = router;