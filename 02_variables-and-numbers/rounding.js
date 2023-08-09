function roundAndCompareFraction(x, y, pricious) {
  let xFraction = Math.floor(x % 1 * Math.pow(10, pricious));
  let yFraction =  Math.floor((y - Math.floor(y)) * Math.pow(10, pricious));
  console.log('xFraction = ' + xFraction);
  console.log('yFraction = ' + yFraction);
  console.log('xFraction > yFraction = ' + (xFraction > yFraction));
  console.log('xFraction < yFraction = ' + (xFraction < yFraction));
  console.log('xFraction >= yFraction = ' + (xFraction >= yFraction));
  console.log('xFraction <= yFraction = ' + (xFraction <= yFraction));
  console.log('xFraction === yFraction = ' + (xFraction === yFraction));
  console.log('xFraction !== yFraction = ' + (xFraction !== yFraction));
  console.log('-------------------------------------------------------');
}

roundAndCompareFraction(13.123456789, 2.123, 5);
roundAndCompareFraction(13.890123, 2.891564, 2);
roundAndCompareFraction(13.890123, 2.891564, 3);

