const axios = require('axios');

async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
    return data 
}

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    return data 
}

async function listEmployees() {
    const people = await getPeople()
    const work = await getWork()

    var listEmployees = []
    for (var i = 0; i < work.length; i++) {
        var employeesArray = []
        for (var j = 0; j < work[i].employees.length; j++) {
            for (var k = 0; k < people.length; k++) {
                if (work[i]['employees'][j] == people[k].id) {
                    var user = {first_name: people[k].first_name, last_name: people[k].last_name}
                    employeesArray.push(user)
                }
            }
        }
        listEmployees.push({company_name: work[i].company_name, employees: employeesArray})
    }
    return JSON.stringify(listEmployees, null, " ")
}
function checkPhoneNumber(number, cases) {
    const phoneRegEx = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}?$/
    const ssnRegEx = /^[0-9]{3}\-[0-9]{2}\-[0-9]{4}?$/

    if (!number) {
        throw "Number arguement not found"
    }
    if (typeof number != 'string') {
        throw 'Number must be a string'
    }
    if (!phoneRegEx.test(number) && cases == 0) {
        throw 'Phone Number must have the format ###-###-####'
    }
    
    if (!ssnRegEx.test(number) && cases == 1) {
        throw 'SSN must have the format ###-##-####'
    }
}

async function fourOneOne(phoneNumber) {
    checkPhoneNumber(phoneNumber, 0)
    const work = await getWork()
    for (var i = 0; i < work.length; i++) {
        if (work[i].company_phone == phoneNumber) {
            return {
                company_name: work[i].company_name,
                company_address: work[i].company_address
            }
        }
    }
}

async function whereDoTheyWork(ssn) {
    checkPhoneNumber(ssn, 1)
    const work = await getWork()
    const people = await getPeople()
    var socialNumber = ""
    var id = 0
    var sentence = ""
    for (var i in people) {
        if (people[i].ssn == ssn) {
            socialNumber = people[i].ssn
            id = people[i].id
            sentence = people[i].first_name + " " + people[i].last_name + " works at "
        } 
    }
    for (var i = 0; i < work.length; i++) {
        for (var j = 0; j < work[i].employees.length; j++) {
            if (work[i].employees[j] == id) {
                sentence += work[i].company_name
            }
        }
    }
    return sentence

}
module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
}

