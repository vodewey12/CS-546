const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    return data // this will be the array of people objects
  }

function checkId(number) {
    if (!number) {
        throw "parameter must be given"
    }
    if (isNaN(number)) {
        throw "parameter must be a number"
    }
    if (number > 1000 || number < 0) {
        throw "parameter not within range"
    }
}


async function getPersonById(id) {
    checkId(id)
    const data = await getPeople()
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i]
        }
    }
}

async function howManyPerState(stateAbbrv) {
    if (!stateAbbrv) {
        throw "stateAbbrv parameter must be given"
    }
    if (typeof stateAbbrv != 'string' || stateAbbrv.length != 2) {
        throw "stateAbbrv must be a string"
    }

    const data = await getPeople()
    var counter = 0
    for (var i = 0; i < data.length; i++) {
        if (data[i].address.state == stateAbbrv) {
            counter += 1
        }
    }
    if (counter == 0) {
        throw "There are currently no people in " + stateAbbrv
    }
    return counter

}
async function personByAge(index) {
    checkId(index)
    const data = await getPeople()
    const today = new Date()
    for (var i = 0; i < data.length; i++) {
        var diff = today - new Date(data[i].date_of_birth) 
        data[i].age = (diff / (1000 * 60 * 60 * 24 * 365))
    }
    data.sort((a,b) => (a.age < b.age) ? 1 : -1)
    return { 
        first_name: data[index].first_name,
        last_name: data[index].last_name,
        date_of_birth: data[index].date_of_birth,
        age: data[index].age.toFixed(0)
    }
}

//Helper method for people metrics : Find letters vowels and consonants
function getTotals(text, obj) {
    var consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']
    var vowels = ['a','e','i','o','u']
    while (text.length > 0) {

        if (isNaN(text.charAt(0))){
            if (consonants.includes(text.charAt(0).toLowerCase())) {
                obj['totalConsonants'] += 1
            }
            else if (vowels.includes(text.charAt(0).toLowerCase())) {
                obj['totalVowels'] += 1
            }
        }    
        text = text.substring(1)
    }
    obj['totalLetters'] = obj['totalConsonants'] + obj['totalVowels']
    return obj
}

//Helper method for people metrics : counter implementation find the largest
function countRepeating(array) {
    var obj = {}
    var city = ""
    var mostRepeating = 0
    array.forEach(val => obj[val] = (obj[val] || 0) + 1);
    for (var i in obj) {
        if (obj[i] > mostRepeating) {
            city = i
            mostRepeating = obj[i]
        }
    }
    Object.keys(obj)
    return city
}

async function peopleMetrics() {
    const data = await getPeople()
    const today = new Date()
    var cityArray = []
    var obj = {totalLetters : 0, totalVowels: 0, totalConsonants: 0, longestName: "", shortestName: "ASDFASDFSDGASDNVWERJKLVNAW", mostRepeatingCity: "", averageAge: 0}
    for (var i = 0; i < data.length; i++) {
        var fullName = data[i].first_name + " " + data[i].last_name
        obj = getTotals(fullName, obj)
        if (fullName.length > obj.longestName.length) {
            obj.longestName = fullName
        }
        if (fullName.length < obj.shortestName.length) {
            obj.shortestName = fullName
        }
        cityArray.push(data[i]['address']['city'])
        var diff = today - new Date(data[i].date_of_birth) 
        obj.averageAge += (diff / (1000 * 60 * 60 * 24 * 365))
    }
    obj.mostRepeatingCity = countRepeating(cityArray)
    
    obj.averageAge = (obj.averageAge / data.length).toFixed(0)

    return obj

}
module.exports = {
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
}