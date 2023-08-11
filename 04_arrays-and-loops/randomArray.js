function randomArray(n, m, count) {
  if (Number.isInteger(n) && Number.isInteger(m) && Number.isInteger(count)) {
    let randomArray = [];
    for (let i = 0; i < count; i++) {
      randomArray.push(randomInt(n, m));
    }
    console.log(randomArray);
  }
  else {
    throw new Error('Parameters are not integer numbers!');
  }
}

function randomInt(n, m) {
  let range = Math.abs(n - m);
  return Math.round(Math.random() * range) + Math.min(n, m);
}

randomArray(0, 100, 100);
randomArray(2, 5, 50);
randomArray(100, -5, 70);
randomArray(-3, -10, 42);
