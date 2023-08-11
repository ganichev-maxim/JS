function generateAndShuffle(count) {
  if (Number.isInteger(count) && count >= 0) {
    let array = createOrderedArray(count);
    array = shuffle(array);
    console.log(array);
  }
  else {
    throw new Error('Parameter is not valid!');
  }
}

function createOrderedArray(count) {
  let array = [];
  for (let i = 1; i <= count; i++) {
    array.push(i);
  }
  return array;
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let temp = array[i];
    let randIndex = getRandomIndex(array);
    array[i] = array[randIndex];
    array[randIndex] = temp;
  }
  return array;
}

function getRandomIndex(array) {
  return Math.round(Math.random() * (array.length - 1));
}

generateAndShuffle(5);
generateAndShuffle(7);
generateAndShuffle(3);
