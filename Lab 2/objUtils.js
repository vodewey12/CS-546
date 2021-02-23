const makeArray = function makeArray(array) {
    if (!Array.isArray(array) || array.length == 0) {
        throw 'array is empty'
    }
    for (var i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'object') {
            throw 'Array elements must be an object'
        }
        else if (!array[i] || Object.keys(array[i]).length === 0) {
            throw 'Object elements in array must not be empty'
        }
    }
    let objArr = []
    array.forEach(element => objArr.push(...Object.entries(element)));
    return objArr;
}

const isDeepEqual = function isDeepEqual(obj1, obj2) {
    if (!obj1 || !obj2) {
        throw 'Object parameters does not exists'
    }

    if (typeof obj1 == 'object' && typeof obj2 == 'object') {
        for (var i in obj1) {
            if (!(i in obj2) || !isDeepEqual(obj1[i], obj2[i])) {
                return false
            } 
        }
        for (var i in obj2) {
            if (!(i in obj1) || !isDeepEqual(obj1[i], obj2[i])) {
                return false
            } 
        }
        return true        
    } else return obj1 === obj2
}

const computeObject = function computeObject(object, func) {
    if (typeof object !== 'object') {
        throw 'Array elements must be an object'
    }
    else if (!object || Object.keys(object).length === 0) {
        throw 'Object elements in array must not be empty'
    }
    if (typeof func !== 'function') {
        throw 'Function parameter must be a function'
    }

    for (var i in object) {
        if (typeof object[i] !== 'number') {
            throw 'Object values for each key must be a numbers'
        }
        object[i] = func(object[i])
    }
    return object
}

module.exports = {
    firstName: "Aaron", 
    lastName: "Vo", 
    studentId: "10429421",
    makeArray,
    isDeepEqual,
    computeObject
};