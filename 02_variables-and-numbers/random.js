function random(n, m) {
  if (isFinite(n) && isFinite(m)) {
    let gap = Math.abs(n - m);
    let result = Math.round(Math.random() * gap) + Math.min(n, m);
    return result;
  }
  return NaN;
}

function generateRandom(n, m) {
  let x = random(n, m);
  let y = random(n, m);
  console.log('x = ', x);
  console.log('y = ', y);

  console.log('x > y = ' + (x > y));
  console.log('x < y = ' + (x < y));
  console.log('x >= y = ' + (x >= y));
  console.log('x <= y = ' + (x <= y));
  console.log('x === y = ' + (x === y));
  console.log('x !== y = ' + (x !== y));
  console.log('-------------------------------------------------------');
}

function runGenerate(n, m) {
  console.log('[' + n + ', ' + m + ']');
  for (let i = 0; i < 10; i++) {
    generateRandom(n, m);
  }
}

runGenerate(0, 100);
runGenerate(2, 5);
runGenerate(100, -5);
runGenerate(-3, -10);

