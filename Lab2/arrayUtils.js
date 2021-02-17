const mean = function mean(array) {
    var sum = 0;
    if (!Array.isArray(array) || array.length == 0) {
        throw 'array is empty'
    }

    for (var i = 0; i < array.length; i++) {
        if (isNaN(array[i])) {
            throw array[i] + ' is not a number'
        } else {
            sum += array[i]
        }

    }

    return sum/(array.length)
}


const medianSquared = function medianSquared(array) {
    if (!Array.isArray(array) || array.length == 0) {
        throw 'array is empty'
    }
    for (var i = 0; i < array.length; i++) {
        if (isNaN(array[i])) {
            throw array[i] + ' is not a number'
        } 
        if (array.length%2 == 1) {
            return (Math.pow(array[Math.floor(array.length/2)],2))
        } else return Math.pow((array[Math.floor(array.length/2)-1]+ array[Math.floor(array.length/2)])/2,2)
    }

}

const maxElement = function maxElement(array) {
    var max = Number.MIN_VALUE
    if (!Array.isArray(array) || array.length == 0) {
        throw 'array is empty'
    }
    for (var i = 0; i < array.length; i++) {
        if (isNaN(array[i])) {
            throw array[i] + ' is not a number'
        } 
        max = Math.max(max, array[i])
    }

    var obj = {}
    obj[max] = array.indexOf(max)

    return obj
}

const fill = function fill(end, value) {
    if (!end) {
        throw 'end parameter does not exists'
    }
    if (isNaN(end)) {
        throw 'end parameter is not a parameter'
    }
    if (end <= 0) {
        throw 'end must be a positive integer'
    }
    array = []
    if (typeof value !== 'undefined') {
        
        for (var i = 0; i < end; i++) {
            array[i] = value 
        }
    }
    else {
        for (var i = 0; i < end; i++) {
            array[i] = i 
        }
    }

    return array
}

const countRepeating = function countRepeating(array) {
    if (!Array.isArray(array)) {
        throw 'array parameter does not exist'
    }
    for (var i = 0; i < array.length; i++) {
        if (typeof array[i] === 'boolean' || typeof array[i] === 'bigint' || typeof array[i] === 'function' || typeof array[i] === 'object' || typeof array[i] === 'symbol' ||
            typeof array[i] === 'undefined' || array[i] == null) {
            throw "array elements must be number or string"
        }
    }
    var obj = {}
    array.forEach(val => obj[val] = (obj[val] || 0) + 1);
    for (var i in obj) {
        
        if (obj[i] < 2) {
            delete obj[i]
        }
    }
    return obj
}

const isEqual = function isEqual(array1, array2) {
    if (!array1 || !array2) {
        throw 'array parameter does not exist'
    }
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        throw 'parameter is not array'
    }
    if (array1.length != array2.length) {
        return false
    }
    for (var i = 0; i < array1.length; i++) {
        if (Array.isArray(array1[i]) && Array.isArray(array2[i])) {
            arr1 = array1[i].sort() 
            arr2 = array2[i].sort()
            for (var j = 0; j < arr1.length; j++) {
                if (arr1[j] !== arr2[j]){
                    return false
                }
            } 
        } else if (!Array.isArray(array1[i]) && !Array.isArray(array2[i])) {
            array1 = array1.sort()
            array2 = array2.sort()
            if (array1[i] !== array2[i]) {  
                return false
            }
        }
    }
    return true
}   
module.exports = {
    firstName: "Aaron", 
    lastName: "Vo", 
    studentId: "10429421",
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};