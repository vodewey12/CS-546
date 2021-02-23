
const {getPersonById,howManyPerState, personByAge, peopleMetrics } = require("./people");
const {listEmployees, fourOneOne, whereDoTheyWork } = require("./work")
async function main() {
    try {
        let id = await getPersonById(43)
        console.log(id)
    } catch(e) {
        console.log(e)
    }
    try {
        let people = await howManyPerState("NY")
        console.log(people)
    } catch(e) {
        console.log(e)
    }

    try {
        let age = await personByAge(43)
        console.log(age)
    } catch(e) {
        console.log(e)
    }
    try {
        let metrics = await peopleMetrics(43)
        console.log(metrics)
    } catch(e) {
        console.log(e)
    }
    try {
        let employees = await listEmployees()
        console.log(employees)
    } catch(e) {
        console.log(e)
    }
    try {
        let phone = await fourOneOne('240-144-7553')
        console.log(phone)
    } catch(e) {
        console.log(e)
    }
       
    try {
        let social = await whereDoTheyWork('277-85-0056')
        console.log(social)
    } catch(e) {
        console.log(e)
    }
}

main()
