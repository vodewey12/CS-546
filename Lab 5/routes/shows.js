const express = require('express');
const axios = require('axios');
let router = express.Router();


async function getShowsbyId(id) {
    if (typeof req.params.id != 'number' && req.params.id <= 0) {
        throw 'Invalid id'
    }
    const {
        data
    } = await axios.get(`http://api.tvmaze.com/shows/${id}`)
    return data
}
async function getShows() {
    const {
        data
    } = await axios.get('http://api.tvmaze.com/shows')
    return data
}

router.get('/', async (req, res) => {
    try {
        const data = await getShows()
        res.json(data);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    
    try {
        const data = await getShowsbyId(req.params.id);
        res.json(data);
    } catch (e) {
        res.status(404).json({
            message: 'No show with that Id'
        });
    }
});




module.exports = router;