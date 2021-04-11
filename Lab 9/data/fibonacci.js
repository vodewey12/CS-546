let exportedMethods = {
  findFibonacci(index) {
    let arr = [];
    arr[0] = 0;
    arr[1] = 1;
    arr[2] = 1;
    if (index < 1) {
      return 0;
    }
    if (index <= 2) {
      return arr[index];
    }
    for (var i = 2; i <= index; i++) {
      arr[i] = arr[i - 1] + arr[i - 2];
    }

    return arr[index];
  },
  checkPrime(number) {
    return number % 2 == 1 ? true : false;
  },
};

module.exports = exportedMethods;
