function arrSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }    
  }
  return array;
}

console.log(arrSort([2,5,1,3,4]));
console.log(arrSort([12,33,3,44,100]));
console.log(arrSort([0,1]));