const movies = require('./movies');
const connection = require('./config/mongoConnection');

async function main() {
    console.log("\nCreate Movie: ")

    try {
        const billAndTed = await movies.create("Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2027});
        console.log(billAndTed);
    } catch (err) {
        console.log(err)
    }


    console.log("\nGet all movies: ")
    try {
        const billAndTed = await movies.getAll()
        console.log(billAndTed);
    } catch (err) {
        console.log(err)
    }


    console.log("\nGet movies based on ID: ")
    try {
        const billAndTed = await movies.get("603dc90205fe802b3893f644");
        console.log(billAndTed);
    } catch (err) {
        console.log(err)
    }
    

    console.log("\nRemove movies based on ID: ")
    try {
        const billAndTed = await movies.remove("603ed7564e989a58f8854152");
        console.log(billAndTed);
    } catch (err) {
        console.log(err)
    }
    console.log("\nRename movies based on ID: ")

    try {
        const renamedBillAndTed = await movies.rename("dsfsdf", "");
        console.log(renamedBillAndTed);
    } catch (err) {
        console.log(err)
    }
}
main();