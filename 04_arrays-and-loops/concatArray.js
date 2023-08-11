function concat(array1, array2) {
  if (array1 instanceof Array && array2 instanceof Array) {
    for (let i = 0; i < array2.length; i++) {
      array1.push(array2[i]);
    }
    console.log(array1);
  }
  else {
    throw new Error('Parameters are not valid!');
  }
}

concat([2, 2, 17, 21, 45, 12, 54, 31, 53], [12, 44, 23, 5]);

function concatToNewArray(array1, array2) {
  if (array1 instanceof Array && array2 instanceof Array) {
    let result = [];
    let count = array1.length + array2.length;
    for (let i = 0; i < count; i++) {
      let index;
      let array;
      if (i < array1.length) {
        index = i;
        array = array1;
      }
      else {
        index = i - array1.length;
        array = array2;
      }
      result.push(array[index]);
    }
    console.log(result);
  }
  else {
    throw new Error('Parameters are not valid!');
  }
}

concatToNewArray([2, 2, 17, 21, 45, 12, 54, 31, 53], [12, 44, 23, 5]);