const express = require('express');
const app = express();
const shows = require('./routes/shows')
app.use("/shows", shows);


app.get('/aboutme', async (req, res) => {
    try {
        const data = {
            name: 'Aaron Dewey Vo',
            cwid: '10429421',
            biography: "I am a junior software engineer (3/4). I like to do almost anything and isnt afraid to try new things. However, I mainly play guitar, rock climb, play basketball, and program video games as my hobby." +
            "\nAs a software engineer, I like to make apps that are generally useless and gimmicky but utilizes a different feature each time ",
            favoriteShows: ["Wandavision", "Attack On Titan", "The Mandalorian", "Dexter", "It's Always Sunny in Philadelphia"]
        }
        res.send(data)
    } catch (e) {
        res.status(404).json({
            message: 'Post not found'
        });
    }
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});