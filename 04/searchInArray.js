function searchInShuffledArray(count, n) {
  if (Number.isInteger(count) && count >= 0 && Number.isInteger(n)) {
    let array = generateAndShuffle(count);
    let pos = getPos(array, n);
    pos === -1 ? console.log('элемент не найден') : console.log(`индекс элемента = ${pos}`);
  }
  else {
    throw new Error('Parameters are not valid!');
  }
}

function getPos(array, toSearch) {
  for (let pos in array) {
    if (array[pos] === toSearch) {
      return parseInt(pos);
    }
  }
  return -1;
}

function generateAndShuffle(count) {
  let array = createOrderedArray(count);
  array = shuffle(array);
  return array;
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

searchInShuffledArray(5, 3);
searchInShuffledArray(7, 1);
searchInShuffledArray(3, 7);
