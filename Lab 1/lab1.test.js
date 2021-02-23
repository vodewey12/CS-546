const lab1 = require("./lab1");

console.log(lab1.questionOne([1, 2, 3])); 
// should return and output {'1': false, '2': true, '3': true}

console.log(lab1.questionTwo([1,2,3])); 
// should return and output 733.36 

console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// returns and outputs: {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionFour(25000, 3.11, 5)); 
// should return and output: 450.44


try{

    lab1.sayHello('Patrick');
  
    lab1.sayHello ();
  
    lab1.sayHello (1,2);
  
    console.log(lab1.sayHello ('Patrick', 'Hill'));
  
  }catch(e){
  
    console.log(e);
  
  }