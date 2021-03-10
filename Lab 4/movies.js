const mongoCollections = require('./config/mongoCollections');
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb');

module.exports = {
    checkValidId(id) {
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        return checkForHexRegExp.test(id)
    },
    async get(id) {
        const movieCollection = await movies()
        if (!id || typeof id != 'string' || id.length == 0) {
            throw 'Id parameter must be defined'
        }
        if (await movieCollection.findOne({_id: ObjectId(id)}) === null) {
            throw 'Cannot find document with this Id'
        }
        if (!this.checkValidId(id)) {
            throw 'Invalid Id'
        }
        return await movieCollection.findOne({_id: ObjectId(id)})
    },
    async create(title, plot, rating, runtime, genre, cast, info, color) {
        var today = new Date()
        var future = today.getFullYear() + 5
        if (!title || !plot || !rating || !runtime || !genre || !cast || !info) {
            throw 'Parameters must be defined'
        }
        else if (typeof title != 'string' ||typeof plot != 'string'|| typeof rating != 'string'|| typeof runtime != 'string'|| typeof genre != 'string'|| !Array.isArray(cast) || typeof info != 'object'){
            throw 'Parameters must be a string type'
        }
        else if (title.length == 0 || plot.length == 0 || rating.length == 0 || runtime.length == 0 || genre.length == 0 || cast.length == 0) {
            throw 'Parameter string length must be greater than 0'
        }
        if (!info.director || typeof info.director != 'string' || info.director.length == 0) {
            throw 'director in object info is not valid'
        }

        if (!info.yearReleased || typeof info.yearReleased != 'number' || info.yearReleased.toString().length != 4) {
            throw 'yearRelease in object info is not valid'
        }
        if (info.yearReleased < 1930 || info.yearReleased > future) {
            throw 'yearRlease is not a valid year'
        }


        const movieCollection = await movies()
        let movie = {
            title: title,
            plot: plot,
            rating: rating,
            runtime: runtime,
            genre: genre,
            cast: cast,
            info: info,
            color: color        
        }
        const newMovie = await movieCollection.insertOne(movie)
        const _id = newMovie.insertedId;
        return await movieCollection.findOne({_id: _id})

    },

    async getAll() {
        const movieCollection = await movies()
        const movieList = await movieCollection.find({}).toArray()
        return movieList
    },
    async remove(id) {
        const movieCollection = await movies()
        if (!id || typeof id != 'string' || id.length == 0) {
            throw 'Id parameter must be defined'
        }
        if (!this.checkValidId(id)) {
            throw 'Invalid Id'
        }
        if (await movieCollection.findOne({_id: ObjectId(id)}) === null) {
            throw 'Cannot find document with this Id'
        }
        const movie = await movieCollection.findOneAndDelete({_id:ObjectId(id)})
        return movie.value.title + " has been successfully deleted"
    },

    async rename(id, newTitle) {
        if (!id || typeof id != 'string' || id.length == 0) {
            throw 'Id parameter must be defined'
        }
        if (!newTitle || typeof newTitle != 'string' || newTitle.length == 0) {
            throw 'title parameter must be defined'
        }

        if (!this.checkValidId(id)) {
            throw 'Invalid Id'
        }
        const movieCollection = await movies()
        if (await movieCollection.findOne({_id: ObjectId(id)}) == null) {
            throw 'Cannot find document with this Id'
        }
        const movie = await movieCollection.updateOne({_id: ObjectId(id)}, {$set: {title: newTitle}})
        return this.get(id)
    }

}