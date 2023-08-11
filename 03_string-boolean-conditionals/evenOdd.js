function evenOdd(number) {
  if (typeof number === 'number' && Number.isInteger(number)) {
    number % 2 === 0 ? console.log('Число чётное') : console.log('Число нечётное');;
  }
  else {
    throw new Error('Parameters is not an integer number!');
  }
}

evenOdd(2);
evenOdd(5);
evenOdd(8);
