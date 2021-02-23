const checkParamter = function checkParamter(string, check) {

    if (!string) {
        throw 'String paramter does not exist'
    }

    if (typeof string !== 'string') {
        throw 'String parameter is not a string'
    }
    if (check == 1) {
        if (string.length == 0) {
            throw 'String length is 0'
        }
    } else {
        if (string.length < 2) {
            throw 'String length must be at least 2'
        }
    }
    
    if (!string.replace(/\s/g, '').length) {
        throw 'string only contains whitespace'
    }


}

const camelCase = function camelCase(string) {
    checkParamter(string, 1)
    return string.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}
const replaceChar = function replaceChar(string) {
    checkParamter(string, 1)
    var array = ['*','$']
    const firstChar = string.charAt(0).toLowerCase()
    var counter = 0
    var newString = string
    for (var i = 1; i < string.length; i++) {
        if (string.charAt(i) === firstChar) {
            var newString = newString.substr(0, i) + array[counter % array.length] + newString.substr(i+1)
            counter +=1
        }
    }
    return newString
}

const mashUp = function mashUp(string1, string2) {
    checkParamter(string1, 2)
    checkParamter(string2, 2)
    return string2.substr(0,2) + string1.substr(2) + " " + string1.substr(0,2) + string2.substr(2)
}


module.exports = {
    firstName: "Aaron", 
    lastName: "Vo", 
    studentId: "10429421",
    camelCase,
    replaceChar,
    mashUp
};