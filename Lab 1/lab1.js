const questionOne = function questionOne(arr) {
    var obj = {};
    if (!arr) {
        return obj
    }
    for(var i = 0; i < arr.length; i++) {
        obj[arr[i]]= true
        if (arr[i] == 1) {
            obj[arr[i]] = false;
        }
        if (arr[i] == 2) {
            obj[arr[i]] = true;
        } else {
            for(var j=2; j < arr[i]; j++) {
                if (arr[i] % j == 0) {
                    obj[arr[i]] = false;
                }
            }
            
        }
    }
    return obj
}

const questionTwo = function questionTwo(arr) { 
    var sum = 0;
    if (!arr) {
        return sum
    }
    
    for (var i = 0; i < arr.length; i++) {
        sum += (arr[i]*arr[i])
    }
    sum = Math.sqrt(Math.pow(sum,5))
    return sum.toFixed(2)

}

const questionThree = function questionThree(text) {
    var consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']
    var vowels = ['a','e','i','o','u']
    var punctuations = ['.',',','?',':','!','(',')','[',']','\'',';','"']
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var obj = {'consonants': 0, 'vowels': 0, 'numbers': 0, 'spaces':(text.split(" ").length -1), 'punctuation': 0, 'specialCharacters': 0}
    while (text.length > 0) {

        if (isNaN(text.charAt(0))){
            if (consonants.includes(text.charAt(0).toLowerCase())) {
                obj['consonants'] += 1
            }
            else if (vowels.includes(text.charAt(0).toLowerCase())) {
                obj['vowels'] += 1
            }
            else if (punctuations.includes(text.charAt(0))) {
                obj['punctuation'] += 1
            } 
            else if (format.test(text.substring(0,1))) {
                obj['specialCharacters'] += 1
            }
        }    
        if (!!text.charAt(0).trim() && text.charAt(0) > -1){
            obj['numbers'] += 1
        }
        text = text.substring(1)
    }
    return obj
}

const questionFour = function questionFour(num1, num2,num3) {
    var rate = num2/100
    var periods = num3*12
    var reg = (rate*num1/12)/(1-Math.pow(rate/12+1, - periods))
    return reg.toFixed(2)
}

module.exports = {
    firstName: "Aaron", 
    lastName: "Vo", 
    studentId: "10429421",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};