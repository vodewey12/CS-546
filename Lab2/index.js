const { mean, medianSquared, maxElement, fill, countRepeating, isEqual } = require("./arrayUtils");
const { camelCase, replaceChar, mashUp } = require("./stringUtils")
const { makeArray, isDeepEqual, computeObject } = require("./objUtils")

//Mean test
try {
    //Should pass
    console.log(mean([1, 2, 3]));
    console.log('Mean passed successfully')
} catch (e) {
    console.error('Mean failed test case')
}

try {
    //Should fail
    console.log(mean(1234))
    console.log('Mean did not error')
} catch (e) {
    console.error('Mean failed Successfully')
}

//Median Squared test
try {
    //Should pass
    console.log(medianSquared([1, 2, 4]))
    console.log('Median Squared passed successfully')
} catch (e) {
    console.error('Median Squared failed test case')
}

try {
    //Should fail
    console.log(medianSquared('banana'))
    console.log('Median Squared did not error')
} catch (e) {
    console.error('Median Squared failed Successfully')
}

//Max Element Squared test
try {
    //Should pass
    console.log(maxElement([5,6,7]))
    console.log('Max Element passed successfully')
} catch (e) {
    console.error('Max Element failed test case')
}

try {
    //Should fail
    console.log(maxElement([]))
    console.log('Max Element Squared did not error')
} catch (e) {
    console.error('Max Element Squared failed Successfully')
}


//Fill test
try {
    //Should pass
    console.log(fill(3, 'welcome'))
    console.log('Fill passed successfully')
} catch (e) {
    console.error('Fill failed test case')
}

try {
    //Should fail
    console.log(fill())
    console.log('Fill did not error')
} catch (e) {
    console.error('Fill failed Successfully')
}

//Count Repeating test
try {
    //Should pass
    console.log(countRepeating([7, '7', 13, "Hello","Hello", "hello"]))
    console.log('Count Repeating passed successfully')
} catch (e) {
    console.error('Count Repeating failed test case')
}

try {
    //Should fail
    console.log(countRepeating([7, '7', 13, "Hello",false, null]))
    console.log('Count Repeating did not error')
} catch (e) {
    console.error('Count Repeating failed Successfully')
}

//Is Equal test
try {
    //Should pass
    console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]));
    console.log('Is Equal Repeating passed successfully')
} catch (e) {
    console.error('Is Equal Repeating failed test case')
}

try {
    //Should fail
    console.log(isEqual([]));
    console.log('Is Equal Repeating did not error')
} catch (e) {
    console.error('Is Equal Repeating failed Successfully')
}

//Camel Case test
try {
    //Should pass
    console.log(camelCase('FOO BAR'));
    console.log('Camel Case passed successfully')
} catch (e) {
    console.error('Camel Case failed test case')
}

try {
    //Should fail
    console.log(camelCase());
    console.log('Camel Case did not error')
} catch (e) {
    console.error('Camel Case failed Successfully')
}

//Replace Character test
try {
    //Should pass
    console.log(replaceChar("Daddy"))
    console.log('Replace Character passed successfully')
} catch (e) {
    console.error('Replace Character failed test case')
}

try {
    //Should fail
    console.log(replaceChar(123))
    console.log('Replace Character did not error')
} catch (e) {
    console.error('Replace Character failed Successfully')
}

//Mash Up test
try {
    //Should pass
    console.log(mashUp("Patrick", "Hill"))
    console.log('Mash Up passed successfully')
} catch (e) {
    console.error('Mash Up failed test case')
}

try {
    //Should fail
    console.log(mashUp("P", "Hill"))
    console.log('Mash Up did not error')
} catch (e) {
    console.error('Mash Up failed Successfully')
}


const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};

//Make Array test
try {
    //Should pass
    console.log(makeArray([first, second, third]))
    console.log('Make Array passed successfully')
} catch (e) {
    console.error('Make Array failed test case')
}

try {
    //Should fail
    console.log(makeArray([first, second, 'third']))
    console.log('Make Array did not error')
} catch (e) {
    console.error('Make Array failed Successfully')
}

//Deep Object Equal test
try {
    //Should pass
    console.log(isDeepEqual(forth, fifth)); // true
    console.log('Deep Object Equal passed successfully')
} catch (e) {
    console.error('Deep Object Equal failed test case')
}

try {
    //Should fail
    console.log(isDeepEqual(first)); // false
    console.log('Deep Object Equal did not error')
} catch (e) {
    console.error('Deep Object Equal failed Successfully')
}


//Compute Object Equal test
try {
    //Should pass
    console.log(computeObject({ a: 3, b: 7, c: 5 }, n => n * 2))
    console.log('Compute Object passed successfully')
} catch (e) {
    console.error('Compute Object failed test case')
}

try {
    //Should fail
    console.log(computeObject({ a: 3, b: 7, c: 5 }, 2))
    console.log('Compute Object did not error')
} catch (e) {
    console.error('Compute Object failed Successfully')
}


